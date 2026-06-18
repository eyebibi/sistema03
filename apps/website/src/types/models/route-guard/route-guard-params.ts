import { ZodObject, ZodRawShape } from "zod";

export interface RouteGuardParams<T extends ZodRawShape> {
  schema?: ZodObject<T>;
  requiresAuth: boolean;
}
