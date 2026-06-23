import { ActionPerformer } from "./ActionPerformer.js";
import { serverToJson } from "../serverToJson.js";
import { channelTypeMap } from "../types/ChannelTypeMap.js";
import type { PermissionOverwrite } from "../types/PermissionOverwrites.js";
import { buildDiscordOverwrites } from "../permissionToDiscordFlag.js";

type CreateChannelAction = {
  action: "create_channel";
  channelName: string;
  channelType: keyof typeof channelTypeMap;
  channelCategoryName?: string;
  rolePermissions?: PermissionOverwrite[];
};

export class CreateChannelPerformer extends ActionPerformer<CreateChannelAction> {
  get channelType() {
    return channelTypeMap[this.actionDetails.channelType];
  }

  get parentCategoryId() {
    if (!this.actionDetails.channelCategoryName) return undefined;

    return serverToJson(this.interaction.guild!).categories.find(
      (category) => category.name === this.actionDetails.channelCategoryName
    )?.id;
  }

  get channelPermissions() {
    const rolePerms = this.actionDetails.rolePermissions;
    if (!rolePerms || rolePerms.length === 0) return undefined;

    return buildDiscordOverwrites({
      guild: this.interaction.guild!,
      overrides: rolePerms,
    });
  }

  async perform() {
    await this.interaction.guild!.channels.create({
      name: this.actionDetails.channelName,
      type: this.channelType,
      parent: this.parentCategoryId,
      permissionOverwrites: this.channelPermissions,
    });
  }
}
