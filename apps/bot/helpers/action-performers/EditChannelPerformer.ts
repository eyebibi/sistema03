import { ActionPerformer } from "./ActionPerformer.js";
import { serverToJson } from "../serverToJson.js";
import type { PermissionOverwrite } from "../types/PermissionOverwrites.js";
import { buildDiscordOverwrites } from "../permissionToDiscordFlag.js";

type EditChannelAction = {
  action: "edit_channel";
  channelName: string;
  newChannelName?: string;
  newChannelCategoryName?: string;
  newRolePermissions?: PermissionOverwrite[];
};

export class EditChannelPerformer extends ActionPerformer<EditChannelAction> {
  get channelId() {
    return serverToJson(this.interaction.guild!).channels.find(
      (channel) => channel.name === this.actionDetails.channelName
    )?.id;
  }

  get parentCategoryId() {
    if (!this.actionDetails.newChannelCategoryName) return undefined;

    return serverToJson(this.interaction.guild!).categories.find(
      (category) => category.name === this.actionDetails.newChannelCategoryName
    )?.id;
  }

  get channelPermissions() {
    const rolePerms = this.actionDetails.newRolePermissions;
    if (!rolePerms || rolePerms.length === 0) return undefined;

    return buildDiscordOverwrites({
      guild: this.interaction.guild!,
      overrides: rolePerms,
    });
  }

  async perform() {
    if (!this.channelId)
      throw new Error(`Channel ${this.actionDetails.channelName} not found!`);

    await this.interaction.guild!.channels.edit(this.channelId, {
      name: this.actionDetails.newChannelName ?? this.actionDetails.channelName,
      parent: this.parentCategoryId,
      permissionOverwrites: this.channelPermissions,
    });
  }
}
