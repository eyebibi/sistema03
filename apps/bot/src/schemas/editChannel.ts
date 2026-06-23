import z from "zod";

const permissionOverrideSchema = z.object({
  roleName: z.string().describe("Nome exato do cargo."),
  permissions: z
    .record(
      z.string(),
      z.boolean().nullable().describe("true = permitir, false = negar, null = herdar (não definir)")
    )
    .describe(
      "Mapa de permissões para este cargo. Cada permissão pode ser true (permitir), false (negar) ou null/omitido (herdar). Ex: { \"ViewChannel\": true, \"SendMessages\": false }"
    ),
});

export const editChannelSchema = z.object({
  action: z
    .literal("edit_channel")
    .describe(
      "Editar um canal existente no servidor. Alguns dos campos são obrigatórios, porém, os valores não precisam ser necessariamente diferentes dos atuais já existentes para o canal, apenas se necessário."
    ),
  channelName: z.string().describe("O nome do canal a ser editado."),
  newChannelName: z
    .string()
    .optional()
    .describe("O novo nome do canal, se necessário ser alterado."),
  newChannelCategoryName: z
    .string()
    .optional()
    .describe(
      "O nome da categoria para onde o canal será movido, se necessário."
    ),
  newRolePermissions: z
    .array(permissionOverrideSchema)
    .optional()
    .describe(
      "Lista de configurações de permissão por cargo para substituir as atuais. Cada entrada define quais permissões um cargo específico terá no canal. Se não fornecido, as permissões atuais do canal não são alteradas."
    ),
});
