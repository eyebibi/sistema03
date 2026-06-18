import type { CommandInteraction } from "discord.js";

async function deleteAllChannels(interaction: CommandInteraction) {
  if (!interaction.guild) return;
  const channels = await interaction.guild.channels.fetch();

  const channelsToDelete = channels.filter((channel) => {
    if (!channel) return false;
    const rulesChannelId = channel.guild.rulesChannelId;
    const publicUpdatesChannelId = channel.guild.publicUpdatesChannelId;
    const channelsNotToDelete = [
      rulesChannelId,
      publicUpdatesChannelId,
      interaction.channel?.id,
    ];

    return !channelsNotToDelete.includes(channel.id);
  });

  const deletionPromises = channelsToDelete.map(async (channel) => {
    if (!channel) return;
    try {
      await channel.delete();
      console.log(`Deleted channel: ${channel.name}`);
    } catch (error) {
      console.log(
        `Failed to delete channel ${channel.name}:`,
        (error as Error).message
      );
    }
  });

  await Promise.allSettled(deletionPromises);
}

async function deleteRoles(interaction: CommandInteraction) {
  if (!interaction.guild) return;
  const roles = await interaction.guild.roles.fetch();

  const rolesToDelete = roles.filter((role) => {
    return role.editable && role.id !== interaction.guild?.id;
  });

  const deletionPromises = rolesToDelete.map(async (role) => {
    try {
      await role.delete();
      console.log(`Deleted role: ${role.name}`);
    } catch (error) {
      console.log(
        `Failed to delete role ${role.name}:`,
        (error as Error).message
      );
    }
  });

  await Promise.allSettled(deletionPromises);
}

export async function prepareServer(
  interaction: CommandInteraction
): Promise<void> {
  await deleteAllChannels(interaction);
  await deleteRoles(interaction);
}
