import { ChannelType } from "discord.js";

export const channelTypeMap = {
  text: ChannelType.GuildText,
  voice: ChannelType.GuildVoice,
} as const;
