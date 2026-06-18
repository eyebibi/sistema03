import type { CommandInteraction } from "discord.js";
import type { ActionType } from "../../src/schemas/index.js";

export class ActionPerformer<TAction extends ActionType = ActionType> {
  constructor(
    protected actionDetails: TAction,
    protected interaction: CommandInteraction
  ) {}

  async perform(): Promise<void> {
    throw new Error("Delegated to subclasses");
  }
}
