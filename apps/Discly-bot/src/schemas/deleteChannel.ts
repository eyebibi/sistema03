import z from "zod";

export const deleteChannelSchema = z.object({
  action: z
    .literal("delete_channel")
    .describe("Deletar um canal existente no servidor."),
  channelName: z.string().describe("O nome do canal a ser deletado."),
});
