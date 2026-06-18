import { ActionPerformer } from "./ActionPerformer.js";
import type { CategoryChannel } from "discord.js";

type DeleteCategoryAction = {
  action: "delete_category";
  categoryName: string;
};

export class DeleteCategoryPerformer extends ActionPerformer<DeleteCategoryAction> {
  get category() {
    return this.interaction.guild!.channels.cache.find(
      (category) => category.name === this.actionDetails.categoryName
    ) as CategoryChannel | undefined;
  }

  async perform() {
    if (!this.category)
      throw new Error(`Category ${this.actionDetails.categoryName} not found!`);

    await this.category.delete();
  }
}
