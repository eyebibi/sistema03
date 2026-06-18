import z from "zod";

export const createCategorySchema = z.object({
  action: z
    .literal("create_category")
    .describe("Criar uma nova categoria no servidor."),
  categoryName: z.string().describe("Nome da categoria a ser criada."),
});
