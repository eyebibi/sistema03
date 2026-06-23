import type { LlmPermissionOverwrite } from "../helpers/types/PermissionOverwrites.js";

export interface ConfigureServerInput {
  description: string;
  withEmojis: boolean;
}

export interface ServerConfig {
  roles: Array<{
    name: string;
    color: string;
    hoist: boolean;
    mentionable: boolean;
    permissions: string | string[];
    position: number;
  }>;
  categories: Array<{
    name: string;
  }>;
  channels: Array<{
    name: string;
    type: string;
    category: string;
    permission_overwrites: LlmPermissionOverwrite[];
  }>;
}
