"use client";

import { Feature } from "@/types/features/features-types";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface NavigationProps {
  features: Feature[];
  activeFeature: Feature;
  setActiveFeature: (feature: Feature) => void;
}

export default function Navigation({
  features,
  activeFeature,
  setActiveFeature,
}: NavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Auto-scroll to active button when activeFeature changes (only after user interaction)
  useEffect(() => {
    if (!hasUserInteracted) return;

    const activeButton = buttonRefs.current[activeFeature.id];
    if (activeButton && scrollContainerRef.current) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeFeature.id, hasUserInteracted]);

  const handleFeatureClick = (feature: Feature) => {
    setHasUserInteracted(true);
    setActiveFeature(feature);
  };

  return (
    <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
      <div
        ref={scrollContainerRef}
        className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-2 overflow-x-auto w-full max-w-fit"
      >
        <div className="flex gap-1 sm:gap-2 min-w-max">
          {features.map((feature) => (
            <div key={feature.id} className="relative flex-shrink-0">
              <button
                ref={(el) => {
                  buttonRefs.current[feature.id] = el;
                }}
                onClick={() => handleFeatureClick(feature)}
                className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 relative z-10 cursor-pointer text-white hover:text-white/80 whitespace-nowrap"
              >
                {feature.name}
              </button>
              {activeFeature.id === feature.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-light rounded-md"
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
