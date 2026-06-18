import dotenv from "dotenv";

dotenv.config();

import { REST, Routes } from "discord.js";

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const commands: unknown[] = [];
const foldersPath = path.join(path.resolve(), "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));
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

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID!, "1410015178439000147"),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${(data as unknown[]).length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
