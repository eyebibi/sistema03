import { PermissionsBitField } from "discord.js";
import type { ColorResolvable } from "discord.js";
import { ActionPerformer } from "./ActionPerformer.js";
import { CustomPermissions } from "../CustomPermissions.js";

type CreateRoleAction = {
  action: "create_role";
  roleName: string;
  roleColor: string;
  mentionable: boolean;
  position: number;
  permissions: string[];
};

export class CreateRolePerformer extends ActionPerformer<CreateRoleAction> {
  get resolvedPermissions() {
    return this.actionDetails.permissions[0] === "GeneralPermissions"
      ? [...CustomPermissions.generalPermissions]
      : this.actionDetails.permissions;
  }

  async perform() {
    await this.interaction.guild!.roles.create({
      name: this.actionDetails.roleName,
      color: this.actionDetails.roleColor as ColorResolvable,
      mentionable: this.actionDetails.mentionable,
      position: this.actionDetails.position,
      permissions: new PermissionsBitField(
        this.resolvedPermissions as unknown as bigint[]
      ).bitfield,
      hoist: true,
    });
  }
}
