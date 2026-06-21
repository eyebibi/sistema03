import {
  LabelBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  SlashCommandBuilder,
  MessageFlags,
} from "discord.js";
import type { CommandInteraction, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";
import { enrichMessageWithGuildData } from "../../helpers/enrichMessage.js";
import { performActions } from "../../main/performActions.js";
import { createEditServerAgent } from "../../src/agent/factories.js";
import { prisma } from "@discly/db";
import { estimatePromptCost, deductCost } from "../../src/billing/index.js";
import { SYSTEM_MESSAGE, USER_TEMPLATE } from "../../src/agent/EditServerAgent.js";
import { formatSchemaInstructions } from "../../src/schemas/index.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("edit-server")
    .setDescription("Edit your server with AI"),
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand() || !interaction.guild) return;

    const chatInput = interaction as ChatInputCommandInteraction;

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setPlaceholder("Description")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("Describe the changes you want...")
      .setRequired(true);

    const descriptionLabel = new LabelBuilder()
      .setLabel("What do you want to change?")
      .setTextInputComponent(descriptionInput);

    const modal = new ModalBuilder()
      .setCustomId("editServerModal")
      .setTitle("Edit Server")
      .addLabelComponents(descriptionLabel);

    await chatInput.showModal(modal);

    let submitted: ModalSubmitInteraction;
    try {
      submitted = await chatInput.awaitModalSubmit({
        time: 300_000,
        filter: (i) => i.customId === "editServerModal",
      });
    } catch {
      return;
    }

    const rawDescription = submitted.fields.getTextInputValue("description");
    const enrichedMessage = enrichMessageWithGuildData(rawDescription, submitted.guild!);
    const userPrompt = USER_TEMPLATE
      .replace('{user_message}', enrichedMessage)
      .replace('{possible_actions}', formatSchemaInstructions());
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

    const estimatedCost = estimatePromptCost(SYSTEM_MESSAGE + userPrompt, user.plan);
    console.log("estimated cost: ", estimatedCost)

    if (user.credits < estimatedCost) {
      await submitted.reply({
        content: "❌ You do not have enough credits.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    try {
      await submitted.deferReply();

      const agent = createEditServerAgent();
      const { output: llmActions, totalTokens } = await agent.execute(enrichedMessage);

      await deductCost({ discordUserId: interaction.user.id, totalTokens, plan: user.plan });

      await performActions(llmActions, submitted as unknown as CommandInteraction);

      await submitted.editReply({
        content:
          llmActions.length === 0
            ? "🤷‍♂️ No changes made."
            : "✅ Server edited successfully!",
      });
    } catch (error) {
      console.log("Error: ", error);

      try {
        await submitted.editReply(
          "❌ Something went wrong. Please try again."
        );
      } catch {
        // ignore
      }
    }
  },
};
