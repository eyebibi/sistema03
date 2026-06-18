import { ActionPerformer } from "./ActionPerformer.js";
import type { CategoryChannel } from "discord.js";

type EditCategoryAction = {
  action: "edit_category";
  categoryName: string;
  newCategoryName?: string;
};

export class EditCategoryPerformer extends ActionPerformer<EditCategoryAction> {
  get category() {
    return this.interaction.guild!.channels.cache.find(
      (category) => category.name === this.actionDetails.categoryName
    ) as CategoryChannel | undefined;
  }

  async perform() {
    if (!this.category)
      throw new Error(`Category ${this.actionDetails.categoryName} not found!`);

    await this.category.setName(this.actionDetails.newCategoryName!);
  }
}
