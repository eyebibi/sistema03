import { PermissionFlagsBits } from "discord.js";
import { ActionPerformer } from "./ActionPerformer.js";
import { serverToJson } from "../serverToJson.js";

type EditChannelAction = {
  action: "edit_channel";
  channelName: string;
  newChannelName?: string;
  newChannelCategoryName?: string;
  newAllowedRoles?: string[];
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
    if (!this.actionDetails.newAllowedRoles) return undefined;

    return this.interaction.guild!.roles.cache.map((role) => {
      const accessibleByRole = this.actionDetails.newAllowedRoles!.includes(
        role.name
      );

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
    if (!this.channelId)
      throw new Error(`Channel ${this.actionDetails.channelName} not found!`);

    await this.interaction.guild!.channels.edit(this.channelId, {
      name: this.actionDetails.newChannelName ?? this.actionDetails.channelName,
      parent: this.parentCategoryId,
      permissionOverwrites: this.channelPermissions,
    });
  }
}
