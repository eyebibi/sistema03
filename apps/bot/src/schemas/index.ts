import z from "zod";
import { createChannelSchema } from "./createChannel.js";
import { editChannelSchema } from "./editChannel.js";
import { deleteChannelSchema } from "./deleteChannel.js";
import { createRoleSchema } from "./createRole.js";
import { editRoleSchema } from "./editRole.js";
import { deleteRoleSchema } from "./deleteRole.js";
import { createCategorySchema } from "./createCategory.js";
import { editCategorySchema } from "./editCategory.js";
import { deleteCategorySchema } from "./deleteCategory.js";

const actionSchema = z.discriminatedUnion("action", [
  createChannelSchema,
  editChannelSchema,
  deleteChannelSchema,
  createRoleSchema,
  editRoleSchema,
  deleteRoleSchema,
  createCategorySchema,
  editCategorySchema,
  deleteCategorySchema,
]);

export const outputSchema = z.array(actionSchema);

export type ActionType = z.infer<typeof outputSchema>[number];

function describeZodType(type: z.ZodTypeAny): string {
  if (type instanceof z.ZodString) return "string";
  if (type instanceof z.ZodNumber) return "number";
  if (type instanceof z.ZodBoolean) return "boolean";
  if (type instanceof z.ZodArray) {
    return `${describeZodType(type.element)}[]`;
  }
  if (type instanceof z.ZodEnum) {
    return (type._def as { values: string[] }).values
      .map((v) => `"${v}"`)
      .join(" | ");
  }
  if (type instanceof z.ZodLiteral) {
    return `"${String((type._def as { value: unknown }).value)}"`;
  }
  if (type instanceof z.ZodOptional) {
    return `${describeZodType((type._def as { innerType: z.ZodTypeAny }).innerType)}?`;
  }
  return "unknown";
}

function describeObject(schema: z.ZodObject<z.ZodRawShape>): string {
  return Object.entries(schema.shape)
    .map(([key, value]) => {
      const val = value as z.ZodTypeAny;
      const isOptional = val instanceof z.ZodOptional;
      const inner = isOptional
        ? (val._def as { innerType: z.ZodTypeAny }).innerType
        : val;
      const typeName = describeZodType(inner);
      const desc = (inner._def as { description?: string }).description ?? "";
      return `    - ${key}${isOptional ? "?" : ""}: ${typeName}${desc ? ` (${desc})` : ""}`;
    })
    .join("\n");
}

export function formatSchemaInstructions(): string {
  const options = (
    actionSchema._def as {
      options: z.ZodObject<z.ZodRawShape>[];
    }
  ).options;

  return options
    .map((opt) => {
      const shape = opt.shape;
      const actionField = shape["action"];
      if (!actionField) return "";
      const actionType = String(
        (actionField._def as { value: unknown }).value
      );
      const description =
        (opt._def as { description?: string }).description ?? "";
      const fields = describeObject(opt);
      return `  - ${actionType}${description ? `: ${description}` : ""}\n${fields}`;
    })
    .join("\n\n");
}
