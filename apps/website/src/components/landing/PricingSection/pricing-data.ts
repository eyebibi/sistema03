import type { Dictionary } from "@/i18n/request";
import type { PricingCardData } from "@/types/pricing/pricing-types";

export const getPricingData = (dict: Dictionary): PricingCardData[] => [
  {
    id: "basic-plan",
    title: dict.pricing.basic.title,
    description: dict.pricing.basic.description,
    price: 25,
    originalPrice: 30,
    currency: "BRL",
    features: dict.pricing.basic.features.map((text) => ({ text, included: true })),
    buttonText: dict.pricing.basic.buttonText,
  },
  {
    id: "unlimited-plan",
    title: dict.pricing.unlimited.title,
    description: dict.pricing.unlimited.description,
    price: 35,
    currency: "BRL",
    isPopular: true,
    badge: dict.pricing.bestOffer,
    features: [],
    bundleItems: [],
    buttonText: dict.pricing.unlimited.buttonText,
  },
];
