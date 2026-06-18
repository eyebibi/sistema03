import { ActionPerformer } from "./ActionPerformer.js";

type DeleteRoleAction = {
  action: "delete_role";
  roleName: string;
};

export class DeleteRolePerformer extends ActionPerformer<DeleteRoleAction> {
  get role() {
    return this.interaction.guild!.roles.cache.find(
      (role) => role.name === this.actionDetails.roleName
    );
  }

  async perform() {
    if (!this.role)
      throw new Error(`Role ${this.actionDetails.roleName} not found!`);

    await this.role.delete();
  }
}
