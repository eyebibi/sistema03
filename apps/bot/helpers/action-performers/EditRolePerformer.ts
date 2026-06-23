import { PermissionsBitField } from "discord.js";
import type { ColorResolvable } from "discord.js";
import { ActionPerformer } from "./ActionPerformer.js";
import { CustomPermissions } from "../CustomPermissions.js";

type EditRoleAction = {
  action: "edit_role";
  roleName: string;
  newRoleName?: string;
  newRoleColor?: string;
  mentionable?: boolean;
  newPosition?: number;
  keepOldPermissions: boolean;
  newPermissions?: string[];
};

function resolvePermissions(perms: string[]): string[] {
  return perms[0] === "GeneralPermissions"
    ? [...CustomPermissions.generalPermissions]
    : perms;
}

export class EditRolePerformer extends ActionPerformer<EditRoleAction> {
  get role() {
    return this.interaction.guild!.roles.cache.find(
      (role) => role.name === this.actionDetails.roleName
    );
  }

  get permissions() {
    if (!this.actionDetails.keepOldPermissions)
      return this.actionDetails.newPermissions
        ? new PermissionsBitField(
            resolvePermissions(this.actionDetails.newPermissions) as unknown as bigint[]
          ).bitfield
        : undefined;

    const existingPerms = this.role!.permissions.toArray() as string[];
    const newPerms = this.actionDetails.newPermissions ?? [];
    return new PermissionsBitField(
      [...existingPerms, ...resolvePermissions(newPerms)] as unknown as bigint[]
    ).bitfield;
  }

  async perform() {
    if (!this.role)
      throw new Error(`Role ${this.actionDetails.roleName} not found!`);

    await this.interaction.guild!.roles.edit(this.role.id, {
      name: this.actionDetails.newRoleName ?? this.role.name,
      color: this.actionDetails.newRoleColor as ColorResolvable ?? this.role.hexColor,
      mentionable: this.actionDetails.mentionable ?? this.role.mentionable,
      position: this.actionDetails.newPosition ?? this.role.position,
      hoist: true,
      permissions: this.permissions,
    });
  }
}
