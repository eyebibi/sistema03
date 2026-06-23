import dotenv from "dotenv";

dotenv.config();

import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  MessageFlags,
} from "discord.js";
import type {
  ChatInputCommandInteraction,
  CommandInteraction,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

interface CommandModule {
  command: {
    data: { name: string };
    execute: (interaction: CommandInteraction) => Promise<void>;
  };
}

class BotClient extends Client {
  commands: Collection<string, CommandModule>;

  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });
    this.commands = new Collection();
  }
}

const client = new BotClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isSource = __filename.endsWith(".ts");

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => (isSource ? file.endsWith(".ts") : file.endsWith(".js")));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const fileUrl = pathToFileURL(filePath).href;

    import(fileUrl)
      .then((command) => {
        if ("data" in command.command && "execute" in command.command) {
          client.commands.set(command.command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      })
      .catch((error) => {
        console.error(`Error importing ${filePath}:`, error);
      });
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    await command.command.execute(interaction);
  } catch (error) {
    console.log(error);
    console.error(error);

    try {
      const chatInput = interaction as ChatInputCommandInteraction;
      if (chatInput.replied || chatInput.deferred) {
        await chatInput.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await chatInput.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    } catch (followUpError) {
      console.error("Failed to send error message to user:", followUpError);
    }
  }
});

client.login(process.env.BOT_TOKEN);
