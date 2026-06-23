import {
  ChannelType,
  PermissionsBitField,
} from "discord.js";
import type { CommandInteraction, ColorResolvable } from "discord.js";

import { CustomPermissions } from "./CustomPermissions.js";
import type { DiscordOverwrite, LlmPermissionOverwrite } from "./types/PermissionOverwrites.js";
import { buildDiscordOverwrites } from "./permissionToDiscordFlag.js";

interface RoleData {
  name: string;
  color: string;
  hoist: boolean;
  mentionable: boolean;
  permissions: string | string[];
  position: number;
}

interface ChannelData {
  name: string;
  type: string;
  category: string;
  permission_overwrites: LlmPermissionOverwrite[];
}

async function createRoles(
  interaction: CommandInteraction,
  llmResponseRoles: RoleData[] | undefined
) {
  if (!llmResponseRoles || llmResponseRoles.length === 0) {
    console.log("No roles to create");
    return;
  }

  const rolePromises = llmResponseRoles.map(async (roleData) => {
    try {
      return await interaction.guild!.roles.create({
        name: roleData.name,
        color: roleData.color as ColorResolvable,
        hoist: roleData.hoist,
        mentionable: roleData.mentionable,
        permissions:
          roleData.permissions === "GeneralPermissions" ||
          (Array.isArray(roleData.permissions) &&
            roleData.permissions[0] === "GeneralPermissions")
            ? new PermissionsBitField(CustomPermissions.generalPermissions as never)
            : new PermissionsBitField(roleData.permissions as never),
        position: roleData.position,
      });
    } catch (error) {
      console.log(
        `Failed to create role ${roleData.name}:`,
        (error as Error).message
      );
      return null;
    }
  });

  const results = await Promise.allSettled(rolePromises);
  const succeeded = results.filter(
    (r): r is PromiseFulfilledResult<Awaited<(typeof rolePromises)[number]>> =>
      r.status === "fulfilled" && r.value !== null
  );
  console.log(
    `Created ${succeeded.length} out of ${llmResponseRoles.length} roles`
  );
}

async function createCategoriesAndChannels(
  interaction: CommandInteraction,
  llmResponseCategories: Array<{ name: string }> | undefined,
  llmResponseChannels: ChannelData[] | undefined
) {
  if (!llmResponseCategories || llmResponseCategories.length === 0) {
    console.log("No categories to create");
    return;
  }

  const categoryPromises = llmResponseCategories.map(async (categoryData) => {
    try {
      return await interaction.guild!.channels.create({
        name: categoryData.name,
        type: ChannelType.GuildCategory,
      });
    } catch (error) {
      console.log(
        `Failed to create category ${categoryData.name}:`,
        (error as Error).message
      );
      return null;
    }
  });

  const categoryResults = await Promise.allSettled(categoryPromises);
  const createdCategories: Array<{ name: string; id: string }> = [];
  for (const result of categoryResults) {
    if (result.status === "fulfilled" && result.value) {
      createdCategories.push(result.value);
    }
  }

  console.log(
    `Created ${createdCategories.length} out of ${llmResponseCategories.length} categories`
  );

  const categoryMap = createdCategories.reduce<Record<string, string>>(
    (map, category) => {
      map[category.name] = category.id;
      return map;
    },
    {}
  );

  if (!llmResponseChannels || llmResponseChannels.length === 0) {
    console.log("No channels to create");
    return;
  }

  const channelPromises: Array<Promise<unknown>> = [];

  for (const channelData of llmResponseChannels) {
    const channelCategoryName = channelData.category;
    const channelCategoryId = categoryMap[channelCategoryName];

    if (!channelCategoryId) {
      console.error(
        `Category ${channelCategoryName} not found, skipping channel ${channelData.name}`
      );
      continue;
    }

    const overwrites = channelData.permission_overwrites || [];
    let permissionOverwrites: DiscordOverwrite[] = [];

    if (overwrites.length > 0) {
      try {
        permissionOverwrites = buildDiscordOverwrites({
          guild: interaction.guild!,
          overrides: overwrites.map((o) => ({
            roleName: o.role_name,
            permissions: o.permissions,
          })),
        });
      } catch (permError) {
        console.log(
          `Error setting permissions for channel ${channelData.name}:`,
          (permError as Error).message
        );
        permissionOverwrites = [];
      }
    }

    channelPromises.push(
      (async () => {
        try {
          return await interaction.guild!.channels.create({
            name: channelData.name,
            type:
              channelData.type === "text"
                ? ChannelType.GuildText
                : ChannelType.GuildVoice,
            parent: channelCategoryId,
            permissionOverwrites,
          });
        } catch (error) {
          console.log(
            `Failed to create channel ${channelData.name}:`,
            (error as Error).message
          );
          return null;
        }
      })()
    );
  }

  const channelResults = await Promise.allSettled(channelPromises);
  const successfulChannels = channelResults.filter(
    (r) => r.status === "fulfilled" && r.value
  ).length;
  console.log(
    `Created ${successfulChannels} out of ${llmResponseChannels.length} channels`
  );
}

interface LLMResponse {
  roles: RoleData[];
  categories: Array<{ name: string }>;
  channels: ChannelData[];
}

export async function configureServer(
  interaction: CommandInteraction,
  llmResponse: LLMResponse
): Promise<void> {
  if (!llmResponse) {
    throw new Error("Invalid LLM response received");
  }

  try {
    await createRoles(interaction, llmResponse.roles);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await createCategoriesAndChannels(
      interaction,
      llmResponse.categories,
      llmResponse.channels
    );
  } catch (error) {
    console.log("Error in configureServer:", error);
    throw error;
  }
}
