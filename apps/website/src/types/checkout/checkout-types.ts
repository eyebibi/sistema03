import { z } from "zod";

export const createCheckoutBodySchema = z.object({
  planId: z.enum(["basic", "complete"]),
});

export type CreateCheckoutBody = z.infer<typeof createCheckoutBodySchema>;

export interface CreateCheckoutResponse {
  checkoutUrl: string;
}
