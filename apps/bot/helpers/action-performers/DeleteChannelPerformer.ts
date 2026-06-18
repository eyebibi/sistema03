import { ActionPerformer } from "./ActionPerformer.js";
import { serverToJson } from "../serverToJson.js";

type DeleteChannelAction = {
  action: "delete_channel";
  channelName: string;
};

export class DeleteChannelPerformer extends ActionPerformer<DeleteChannelAction> {
  get channelId() {
    return serverToJson(this.interaction.guild!).channels.find(
      (channel) => channel.name === this.actionDetails.channelName
    )?.id;
  }

  get channel() {
    return this.interaction.guild!.channels.cache.get(this.channelId!);
  }

  async perform() {
    if (!this.channel) {
      throw new Error(`Channel ${this.actionDetails.channelName} not found.`);
    }

    await this.channel.delete();
  }
}
