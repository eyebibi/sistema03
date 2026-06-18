import type { Guild } from "discord.js";
import { serverToJson } from "./serverToJson.js";

export function enrichMessageWithGuildData(
  message: string,
  guild: Guild
): string {
  const guildJson = serverToJson(guild);

  const categoriesString = `As categorias do meu servidor são: ${guildJson[
    "categories"
  ]
    .map((category) => category.name)
    .join(", ")}`;

  const channelsString = `Os canais do meu servidor são: ${guildJson[
    "channels"
  ].map((channel) => {
    return JSON.stringify({
      name: channel.name,
      type: channel.type,
      category: channel.parent ?? "",
    });
  })}`;

  const rolesString = `Os cargos do meu servidor são: ${guildJson["roles"].map(
    (role) =>
      JSON.stringify({
        name: role.name,
        color: role.color,
      })
  )}`;

  return `${message}\n${categoriesString}\n${channelsString}\n${rolesString}`;
}
