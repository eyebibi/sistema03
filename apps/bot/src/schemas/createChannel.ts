import z from "zod";
import { channelTypeMap } from "../../helpers/types/ChannelTypeMap.js";

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
  rolePermissions: z
    .array(permissionOverrideSchema)
    .optional()
    .describe(
      "Lista de configurações de permissão por cargo. Cada entrada define quais permissões um cargo específico tem no canal. Se não fornecido, o canal herda as permissões padrão da categoria."
    ),
});
