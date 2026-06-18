import { PermissionFlagsBits } from "discord.js";
import { ActionPerformer } from "./ActionPerformer.js";
import { serverToJson } from "../serverToJson.js";
import { channelTypeMap } from "../types/ChannelTypeMap.js";

type CreateChannelAction = {
  action: "create_channel";
  channelName: string;
  channelType: keyof typeof channelTypeMap;
  channelCategoryName?: string;
  allowedRoles?: string[];
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
    return this.interaction.guild!.roles.cache.map((role) => {
      const accessibleByRole =
        typeof this.actionDetails.allowedRoles === "undefined"
          ? true
          : this.actionDetails.allowedRoles.includes(role.name);

      if (accessibleByRole) {
        return {
          id: role.id,
          allow: [PermissionFlagsBits.ViewChannel],
        };
      }

      return {
        id: role.id,
        deny: [PermissionFlagsBits.ViewChannel],
      };
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
