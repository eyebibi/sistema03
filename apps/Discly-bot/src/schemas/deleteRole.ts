import z from "zod";

export const deleteRoleSchema = z.object({
  action: z
    .literal("delete_role")
    .describe("Deletar um cargo existente no servidor"),
  roleName: z.string().describe("O nome do cargo a ser deletado."),
});
