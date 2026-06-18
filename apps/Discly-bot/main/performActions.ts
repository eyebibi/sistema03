import type { CommandInteraction } from "discord.js";
import type { ActionType } from "../src/schemas/index.js";
import { createActionPerformer } from "../helpers/action-performers/createActionPerformer.js";

export async function performActions(
  llmActions: ActionType[],
  interaction: CommandInteraction
): Promise<void> {
  for (const actionDetails of llmActions) {
    const actionPerformer = createActionPerformer(actionDetails, interaction);
    await actionPerformer.perform();
  }
}
