"use client";

import { useState } from "react";
import Card from "./Card";
import Navigation from "./Navigation";
import { getFeatures } from "./features";
import type { Dictionary } from "@/i18n/request";
import type { Feature } from "@/types/features/features-types";

interface NavigationAndCardProps {
  dict: Dictionary;
}

export default function NavigationAndCard({ dict }: NavigationAndCardProps) {
  const features = getFeatures(dict);
  const [activeFeature, setActiveFeature] = useState<Feature>(features[0]);

  return (
    <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-12 sm:mt-16 lg:mt-20">
      <Navigation
        features={features}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />

      <Card activeFeature={activeFeature} dict={dict} />
    </div>
  );
}
