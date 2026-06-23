export interface PermissionOverwrite {
  roleName: string;
  permissions: Record<string, boolean | null>;
}

export interface LlmPermissionOverwrite {
  role_name: string;
  permissions: Record<string, boolean | null>;
}

export interface DiscordOverwrite {
  id: string;
  allow: bigint[];
  deny: bigint[];
}
