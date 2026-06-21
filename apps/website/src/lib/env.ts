import { z } from "zod";

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_ENDPOINT_SECRET: z.string().min(1),
  STRIPE_PRICE_CREDITS_100: z.string().min(1),
  STRIPE_PRICE_CREDITS_200: z.string().min(1),
  STRIPE_PRICE_CREDITS_500: z.string().min(1),
  STRIPE_PRICE_CREDITS_1000: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().optional(),
  BASE_URL: z.string().optional(),
}).refine(
  (data) => data.NEXT_PUBLIC_BASE_URL || data.BASE_URL,
  "Either NEXT_PUBLIC_BASE_URL or BASE_URL must be set",
);

export const env = envSchema.parse(process.env);
