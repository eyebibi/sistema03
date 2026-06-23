import {
  LabelBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  MessageFlags,
} from "discord.js";
import type { CommandInteraction, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";

import { wait } from "../../helpers/wait.js";
import { normalizeCategories } from "../../helpers/normalizeCategories.js";
import { configureServer } from "../../helpers/configureServer.js";
import { prepareServer } from "../../helpers/prepareServer.js";
import { createConfigureServerAgent } from "../../src/agent/factories.js";
import type { ServerConfig } from "../../command-types/configureServer.js";
import { prisma } from "@discly/db";
import { estimatePromptCost, deductCost } from "../../src/billing/index.js";
import { promptMessage, promptSystemMessage } from "../../helpers/prompt.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("configure-server")
    .setDescription("Configure your server from zero using AI!"),
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand() || !interaction.guild) return;

    const chatInput = interaction as ChatInputCommandInteraction;

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("Describe how you want your new server...")
      .setRequired(true);

    const descriptionLabel = new LabelBuilder()
      .setLabel("How do you want the server?")
      .setTextInputComponent(descriptionInput);

    const emojiSelect = new StringSelectMenuBuilder()
      .setCustomId("emojis")
      .setPlaceholder("Include emojis?")
      .setRequired(true)
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Yes")
          .setDescription("Channel names will have emojis")
          .setValue("true"),
        new StringSelectMenuOptionBuilder()
          .setLabel("No")
          .setDescription("Channel names will be text only")
          .setValue("false"),
      );

    const emojiLabel = new LabelBuilder()
      .setLabel("Emojis in channels")
      .setDescription("Whether channel names should include emojis")
      .setStringSelectMenuComponent(emojiSelect);

    const modal = new ModalBuilder()
      .setCustomId("configureServerModal")
      .setTitle("Configure Server")
      .addLabelComponents(descriptionLabel, emojiLabel);

    await chatInput.showModal(modal);

    let submitted: ModalSubmitInteraction;
    try {
      submitted = await chatInput.awaitModalSubmit({
        time: 300_000,
        filter: (i) => i.customId === "configureServerModal",
      });
    } catch {
      return;
    }

    const serverDescription = submitted.fields.getTextInputValue("description");
    const shouldHaveEmojis = submitted.fields.getStringSelectValues("emojis")[0] === "true";

    const userPrompt = `${promptMessage}\n${serverDescription}\n${shouldHaveEmojis ? 'Add emojis on channel names.' : 'No emojis on channel names.'
      }`;
    const user = await prisma.user.findFirst({
      where: { discordUserId: interaction.user.id },
      select: { credits: true, plan: true },
    });

    if (!user) {
      await submitted.reply({
        content: "❌ You are not registered.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const estimatedCost = estimatePromptCost(promptSystemMessage + userPrompt, user.plan);
    console.log("estimated cost: ", estimatedCost)

    if (user.credits < estimatedCost) {
      await submitted.reply({
        content: "❌ You do not have enough credits.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new Error("Operation timed out")),
        14 * 60 * 1000
      );
    });

    const operationPromise = async () => {
      try {
        await submitted.deferReply();

        await submitted.editReply("🚀 Starting configuration...");

        await prepareServer(submitted as unknown as CommandInteraction);

        await submitted.editReply(
          "🧹 Server prepared! Generating configuration with AI!"
        );

        let llmResponse: ServerConfig;
        let totalTokens = 0;

        try {
          const agent = createConfigureServerAgent();
          const llmTimeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("LLM request timed out")), 30000);
          });

          const result = await Promise.race([
            agent.execute({
              description: serverDescription,
              withEmojis: shouldHaveEmojis,
            }),
            llmTimeoutPromise,
          ]);

          llmResponse = result.output;
          totalTokens = result.totalTokens;
        } catch (llmError) {
          console.log("LLM Error:", llmError);
          throw new Error(
            "AI service is currently unavailable. Please try again later."
          );
        }

        await deductCost({ discordUserId: interaction.user.id, totalTokens, plan: user.plan });

        await submitted.editReply(
          "🤖 AI response received! Applying changes to the server!"
        );

        normalizeCategories(llmResponse);

        await configureServer(submitted as unknown as CommandInteraction, llmResponse);

        await submitted.editReply(
          "✅ Server configured! This channel will be deleted in 5 seconds."
        );

        await wait(5000);

        try {
          if (submitted.channel && "delete" in submitted.channel) {
            await (submitted.channel as unknown as { delete: () => Promise<unknown> }).delete();
          }
        } catch (deleteError) {
          console.log("Could not delete channel:", deleteError);
        }
      } catch (error) {
        console.log("ERRO AQUI");
        console.log(error);
        throw error;
      }
    };

    try {
      await Promise.race([operationPromise(), timeoutPromise]);
    } catch (error) {
      console.log("Operation failed:", error);

      try {
        if (!submitted.replied && !submitted.deferred) {
          await submitted.reply(
            "❌ Something went wrong. Please try again."
          );
        } else {
          const errorMessage =
            error instanceof Error && error.message.includes("timed out")
              ? "⏰ The operation took too long and was aborted."
              : "❌ Something went wrong. Please try again.";
          await submitted.editReply(errorMessage);
        }
      } catch (replyError) {
        console.log("Could not send error message:", replyError);
      }
    }
  },
};
