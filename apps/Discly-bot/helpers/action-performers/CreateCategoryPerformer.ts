import { ChannelType } from "discord.js";
import { ActionPerformer } from "./ActionPerformer.js";

type CreateCategoryAction = {
  action: "create_category";
  categoryName: string;
};

export class CreateCategoryPerformer extends ActionPerformer<CreateCategoryAction> {
  async perform() {
    await this.interaction.guild!.channels.create({
      name: this.actionDetails.categoryName,
      type: ChannelType.GuildCategory,
    });
  }
}
