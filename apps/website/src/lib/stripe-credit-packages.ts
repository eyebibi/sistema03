export const CREDIT_PACKAGES = {
  100: { priceId: process.env.STRIPE_PRICE_CREDITS_100!, credits: 100, displayPrice: "$2.99" },
  200: { priceId: process.env.STRIPE_PRICE_CREDITS_200!, credits: 200, displayPrice: "$4.99" },
  500: { priceId: process.env.STRIPE_PRICE_CREDITS_500!, credits: 500, displayPrice: "$9.99" },
  1000: { priceId: process.env.STRIPE_PRICE_CREDITS_1000!, credits: 1000, displayPrice: "$17.99" },
} as const;

export type CreditPackageKey = keyof typeof CREDIT_PACKAGES;
