import z from "zod";

export const deleteCategorySchema = z.object({
  action: z
    .literal("delete_category")
    .describe("Deletar uma categoria existente no servidor"),
  categoryName: z.string().describe("Nome da categoria a ser deletada"),
});
