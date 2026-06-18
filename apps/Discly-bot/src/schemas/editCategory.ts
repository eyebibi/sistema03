import z from "zod";

export const editCategorySchema = z.object({
  action: z
    .literal("edit_category")
    .describe("Editar uma determinada categoria"),
  categoryName: z.string().describe("Nome da categoria a ser editada"),
  newCategoryName: z
    .string()
    .optional()
    .describe("Novo nome da categoria, se necessário ser alterado"),
});
