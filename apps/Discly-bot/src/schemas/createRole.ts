import z from "zod";
import { CustomPermissions } from "../../helpers/CustomPermissions.js";

export const createRoleSchema = z.object({
  action: z.literal("create_role").describe("Criar um novo cargo no servidor"),
  roleName: z.string().min(1).describe("O nome do cargo a ser criado"),
  roleColor: z
    .string()
    .describe("A cor do cargo a ser criado como um código hexadecimal"),
  mentionable: z
    .boolean()
    .describe("Se o cargo pode ser mencionado por usuários"),
  position: z
    .number()
    .int()
    .nonnegative()
    .describe("A posição do cargo na hierarquia"),
  permissions: z.array(z.string()).describe(
    `As permissões atribuídas ao cargo. No caso de o cargo estar relacionado a alguém com muitas permissões administrativas,
      como um proprietário, administrador ou algo assim, você pode simplesmente dar ao cargo a permissão de 'Administrator'.
      No caso de o cargo estar relacionado a permissões gerais, e nada específico sobre isso foi solicitado, você pode
      simplesmente dar ao cargo a permissão 'GeneralPermissions'. Se nenhum dos 2 casos for atendido, você terá que especificar
      cada permissão individualmente para o cargo dentro de um array de strings, cada string sendo uma permissão específica 
      da lista de permissões. Lista de todas as permissões: ${CustomPermissions.allPermissions.join(
        ", "
      )}`
  ),
});
