import z from "zod";

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
  newAllowedRoles: z
    .array(z.string())
    .optional()
    .describe(
      "Lista com nomes de cargos que terão acesso ao canal. Para fazer o canal visível para todos os membros e cargos, apenas não forneça essa lista."
    ),
});
