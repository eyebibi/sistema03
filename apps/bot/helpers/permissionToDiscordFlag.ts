import { PermissionFlagsBits, type Guild } from "discord.js";
import type {
  PermissionOverwrite,
  DiscordOverwrite,
} from "./types/PermissionOverwrites.js";

interface BuildDiscordOverwritesParams {
  guild: Guild;
  overrides: PermissionOverwrite[];
}

export function buildDiscordOverwrites(
  params: BuildDiscordOverwritesParams
): DiscordOverwrite[] {
  const { guild, overrides } = params;

  return overrides
    .map((override) => {
      const role = guild.roles.cache.find(
        (r) => r.name === override.roleName
      );
      if (!role) return null;

      const allow: bigint[] = [];
      const deny: bigint[] = [];

      for (const [perm, value] of Object.entries(override.permissions)) {
        const flag =
          PermissionFlagsBits[perm as keyof typeof PermissionFlagsBits];
        if (!flag) continue;
        if (value === true) allow.push(flag);
        else if (value === false) deny.push(flag);
      }

      return { id: role.id, allow, deny };
    })
    .filter((o): o is DiscordOverwrite => o !== null);
}
