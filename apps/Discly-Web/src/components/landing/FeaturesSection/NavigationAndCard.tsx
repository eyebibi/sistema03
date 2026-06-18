"use client";

import { useState } from "react";
import Card from "./Card";
import Navigation from "./Navigation";
import { features } from "./features";

export default function NavigationAndCard() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-12 sm:mt-16 lg:mt-20">
      <Navigation
        features={features}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />

      <Card activeFeature={activeFeature} />
    </div>
  );
}
