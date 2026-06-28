import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(import.meta.dirname, "../.env") });

import { REST, Routes } from "discord.js";

import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isSource = __filename.endsWith(".ts");

const isGlobal = process.argv.includes("--global");

const commands: unknown[] = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => (isSource ? file.endsWith(".ts") : file.endsWith(".js")));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(pathToFileURL(filePath).href);
    console.log(command);

    if ("data" in command.command && "execute" in command.command) {
      commands.push(command.command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(process.env.BOT_TOKEN!);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const route = isGlobal
      ? Routes.applicationCommands(process.env.BOT_CLIENT_ID!)
      : Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID!, process.env.GUILD_ID!);

    const data = await rest.put(route, { body: commands });

    console.log(
      `Successfully reloaded ${(data as unknown[]).length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
