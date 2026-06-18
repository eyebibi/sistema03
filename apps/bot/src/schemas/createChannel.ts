import z from "zod";
import { channelTypeMap } from "../../helpers/types/ChannelTypeMap.js";

export const createChannelSchema = z.object({
  action: z
    .literal("create_channel")
    .describe("Criar um novo canal no servidor."),
  channelName: z.string().describe("O nome do novo canal."),
  channelType: z
    .enum(Object.keys(channelTypeMap) as [string, ...string[]])
    .describe("O tipo do canal a ser criado."),
  channelCategoryName: z
    .string()
    .optional()
    .describe(
      "O nome exato da categoria onde o canal será criado, se aplicável. Se não, pode deixar vazio."
    ),
  allowedRoles: z
    .array(z.string())
    .optional()
    .describe(
      "Lista com nomes dos cargos que terão acesso ao canal. Caso o canal possa ser acessível por qualquer um, não deve ser fornecida."
    ),
});
