import { env } from "@/lib/private-env";

// Keep display data in billing page (page.tsx) in sync with keys here
export const CREDIT_PACKAGES = {
  100: { priceId: env.STRIPE_PRICE_CREDITS_100 },
  200: { priceId: env.STRIPE_PRICE_CREDITS_200 },
  500: { priceId: env.STRIPE_PRICE_CREDITS_500 },
  1000: { priceId: env.STRIPE_PRICE_CREDITS_1000 },
} as const;
