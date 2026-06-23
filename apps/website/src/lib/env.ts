import { z } from "zod";

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET_CREDITS: z.string().min(1),
  STRIPE_WEBHOOK_SECRET_PLAN_UPGRADE: z.string().min(1),
  STRIPE_PRICE_CREDITS_100: z.string().min(1),
  STRIPE_PRICE_CREDITS_200: z.string().min(1),
  STRIPE_PRICE_CREDITS_500: z.string().min(1),
  STRIPE_PRICE_CREDITS_1000: z.string().min(1),
  STRIPE_PRICE_PLAN_UPGRADE: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().optional(),
  NEXT_PUBLIC_DISCORD_OAUTH_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_REDIRECT_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID: z.string().min(1),
  DISCORD_OAUTH_CLIENT_SECRET: z.string().min(1),
  BASE_URL: z.string().optional(),
}).refine(
  (data) => data.NEXT_PUBLIC_BASE_URL || data.BASE_URL,
  "Either NEXT_PUBLIC_BASE_URL or BASE_URL must be set",
);

export const env = envSchema.parse(process.env);
