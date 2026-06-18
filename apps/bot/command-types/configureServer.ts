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
    accessible_by: string[];
    not_accessible_by: string[];
    is_moderation_channel: boolean;
  }>;
}
