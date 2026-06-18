import type { CommandInteraction } from "discord.js";
import type { ActionType } from "../../src/schemas/index.js";
import { CreateCategoryPerformer } from "./CreateCategoryPerformer.js";
import { CreateChannelPerformer } from "./CreateChannelPerformer.js";
import { CreateRolePerformer } from "./CreateRolePerformer.js";
import { DeleteCategoryPerformer } from "./DeleteCategoryPerformer.js";
import { DeleteChannelPerformer } from "./DeleteChannelPerformer.js";
import { DeleteRolePerformer } from "./DeleteRolePerformer.js";
import { EditCategoryPerformer } from "./EditCategoryPerformer.js";
import { EditChannelPerformer } from "./EditChannelPerformer.js";
import { EditRolePerformer } from "./EditRolePerformer.js";
import { ActionPerformer } from "./ActionPerformer.js";
export function createActionPerformer(
  actionDetails: ActionType,
  interaction: CommandInteraction
): ActionPerformer {
  switch (actionDetails.action) {
    case "create_category":
      return new CreateCategoryPerformer(
        actionDetails as never,
        interaction
      );
    case "create_channel":
      return new CreateChannelPerformer(
        actionDetails as never,
        interaction
      );
    case "create_role":
      return new CreateRolePerformer(
        actionDetails as never,
        interaction
      );
    case "edit_category":
      return new EditCategoryPerformer(
        actionDetails as never,
        interaction
      );
    case "edit_channel":
      return new EditChannelPerformer(
        actionDetails as never,
        interaction
      );
    case "edit_role":
      return new EditRolePerformer(
        actionDetails as never,
        interaction
      );
    case "delete_category":
      return new DeleteCategoryPerformer(
        actionDetails as never,
        interaction
      );
    case "delete_channel":
      return new DeleteChannelPerformer(
        actionDetails as never,
        interaction
      );
    case "delete_role":
      return new DeleteRolePerformer(
        actionDetails as never,
        interaction
      );
  }
}
