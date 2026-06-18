interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingCardData {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  savings?: string;
  isPopular?: boolean;
  features: PricingFeature[];
  buttonText: string;
  badge?: string;
  bundleItems?: {
    name: string;
    value: string;
    description: string;
  }[];
}
