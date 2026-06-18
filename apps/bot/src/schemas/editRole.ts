import z from "zod";
import { CustomPermissions } from "../../helpers/CustomPermissions.js";

export const editRoleSchema = z.object({
  action: z
    .literal("edit_role")
    .describe(
      "Editar um cargo existente no servidor. Alguns dos campos são obrigatórios, porém, os valores não precisam ser necessariamente diferentes dos atuais para o cargo, apenas se necessário."
    ),
  roleName: z.string().describe("O nome do cargo a ser editado."),
  newRoleName: z
    .string()
    .optional()
    .describe("O novo nome do cargo, se necessário ser alterado."),
  newRoleColor: z
    .string()
    .optional()
    .describe(
      "A nova cor do cargo, no formato hexadecimal, se necessário ser alterada."
    ),
  mentionable: z
    .boolean()
    .optional()
    .describe("Se o cargo pode ser mencionado por usuários."),
  newPosition: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe(
      "A nova posição do cargo na hierarquia do servidor, se necessário ser alterada."
    ),
  keepOldPermissions: z
    .boolean()
    .default(true)
    .describe(
      "Informa se as permissões antigas do cargo devem ser mantidas. Na maioria dos casos, devem ser mantidas, a não ser que o usuário demonstre interesse no contrário."
    ),
  newPermissions: z
    .array(z.string())
    .describe(
      `As permissões atribuídas ao cargo. Se não precisarem ser modificadas, o campo NÃO DEVE SER ENVIADO. 
      No caso de o cargo estar relacionado a alguém com muitas permissões administrativas, como um proprietário, 
      administrador ou algo assim, você pode simplesmente dar ao cargo a permissão de 'Administrator'. No caso 
      de o cargo estar relacionado a permissões gerais, e nada específico sobre isso foi solicitado, você pode 
      simplesmente dar ao cargo a permissão 'GeneralPermissions'. Se nenhum dos 2 casos for atendido, você terá 
      que especificar cada permissão individualmente para o cargo dentro de um array de strings, cada string 
      sendo uma permissão específica da lista de permissões. Lista de todas as permissões: ${CustomPermissions.allPermissions.join(
        ", "
      )}`
    )
    .optional(),
});
