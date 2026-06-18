import { CustomPermissions } from "./CustomPermissions.js";

export function discordPermissionsFor(
  permissionAliases: string[] | undefined
): string[] | undefined {
  if (!permissionAliases) return undefined;

  const result: string[] = [];
  for (const alias of permissionAliases) {
    if (alias === "GeneralPermissions") {
      result.push(...CustomPermissions.generalPermissions);
    } else {
      result.push(alias);
    }
  }
  return result;
}
