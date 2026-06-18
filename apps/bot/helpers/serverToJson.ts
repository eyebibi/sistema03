import {
  PermissionsBitField,
  ChannelType,
  type Guild,
  type Role,
} from "discord.js";

function transformRole(role: Role) {
  return {
    name: role.name,
    permissions: new PermissionsBitField(
      BigInt(role.permissions.bitfield.toString())
    ).toArray(),
    id: role.id,
    color: role.hexColor,
  };
}

function channelsFor(guild: Guild) {
  return guild.channels.cache
    .filter((channel) => channel.type !== ChannelType.GuildCategory)
    .map((channel) => ({
      name: channel.name,
      type: channel.type,
      parent: (channel.parent as { name: string } | null)?.name || null,
      id: channel.id,
    }));
}

function categoriesFor(guild: Guild) {
  return guild.channels.cache
    .filter((channel) => channel.type === ChannelType.GuildCategory)
    .map((channel) => ({
      name: channel.name,
      id: channel.id,
    })) as Array<{ name: string; id: string }>;
}

export function serverToJson(guild: Guild) {
  return {
    roles: guild.roles.cache.map(transformRole),
    categories: categoriesFor(guild),
    channels: channelsFor(guild),
  };
}
