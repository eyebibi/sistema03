import { z } from "zod";

const privateEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET_CREDITS: z.string().min(1),
  STRIPE_WEBHOOK_SECRET_PLAN_UPGRADE: z.string().min(1),
  STRIPE_PRICE_CREDITS_100: z.string().min(1),
  STRIPE_PRICE_CREDITS_200: z.string().min(1),
  STRIPE_PRICE_CREDITS_500: z.string().min(1),
  STRIPE_PRICE_CREDITS_1000: z.string().min(1),
  STRIPE_PRICE_PLAN_UPGRADE: z.string().min(1),
  DISCORD_OAUTH_CLIENT_SECRET: z.string().min(1),
  BASE_URL: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
  SMTP_SERVER_HOST: z.string().min(1),
  SMTP_SERVER_PORT: z.string().min(1),
  SMTP_SERVER_USER: z.string().min(1).or(z.literal('')),
  SMTP_SERVER_PASSWORD: z.string().min(1).or(z.literal('')),
  DISCLY_BASIC_PLAN_PRICE: z.string().min(1),
  DISCLY_UNLIMITED_PLAN_PRICE: z.string().min(1),
  MERCADOPAGO_ACCESS_TOKEN: z.string().min(1),
  IS_LOGGING_ENABLED: z.string().optional(),
  PASSWORD_CHANGE_WEBHOOK_URL: z.string().optional(),
  PASSWORD_RESET_WEBHOOK_URL: z.string().optional(),
  PURCHASE_WEBHOOK_URL: z.string().optional(),
  CHECKOUT_SESSION_WEBHOOK_URL: z.string().optional(),
  NODE_ENV: z.string().optional(),
  VERCEL_ENV: z.string().optional(),
  VERCEL_URL: z.string().optional(),
});

export const env = privateEnvSchema.parse(process.env);
