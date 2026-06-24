import type { Dictionary } from "@/i18n/request";
import type { Feature } from "@/types/features/features-types";
import { env } from "@/lib/public-env";

export const getFeatures = (dict: Dictionary): Feature[] => [
  {
    id: "ai-powered-discord-bot",
    name: dict.features.aiPowered.name,
    title: dict.features.aiPowered.title,
    description: (
      <p className="text-white/80 mb-8 leading-relaxed">
        {dict.features.aiPowered.description}{" "}
        <b>{dict.features.aiPowered.highlight}</b>.
      </p>
    ),
    features: dict.features.aiPowered.featuresList,
    imagePath: "/feature1.png",
  },
  {
    id: "usage-guide",
    name: dict.features.usageGuide.name,
    title: dict.features.usageGuide.title,
    description: dict.features.usageGuide.description,
    features: dict.features.usageGuide.featuresList,
    imagePath: "/feature2.png",
  },
  {
    id: "infinite-customization",
    name: dict.features.infiniteCustomization.name,
    title: dict.features.infiniteCustomization.title,
    description: dict.features.infiniteCustomization.description,
    features: dict.features.infiniteCustomization.featuresList,
    imagePath: "/feature3.png",
  },
  {
    id: "support",
    name: dict.features.support.name,
    title: dict.features.support.title,
    description: `${dict.features.support.descriptionPrefix} ${env.NEXT_PUBLIC_EMAIL_FROM}.`,
    features: dict.features.support.featuresList,
    imagePath: "/feature4.png",
  },
];
