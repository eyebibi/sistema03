import { IconSparkles } from "@tabler/icons-react";
import CardImage from "./CardImage";
import PurchaseModalTrigger from "../PurchaseModalTrigger";
import { Feature } from "@/types/features/features-types";

interface CardProps {
  activeFeature: Feature;
}

export default function Card({ activeFeature }: CardProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div
        key={activeFeature.id}
        className="bg-gradient-to-br from-background-lighter to-background-light rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
              {activeFeature.title}
            </h3>
            {typeof activeFeature.description === "string" ? (
              <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                {activeFeature.description}
              </p>
            ) : (
              <div className="text-white/80 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                {activeFeature.description}
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              {activeFeature.features.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-white/90 text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <PurchaseModalTrigger
                planId="complete"
                planName="Ilimitado"
                className="bg-gradient-to-r from-primary to-blue-700 hover:brightness-90 active:scale-95 w-full sm:w-auto"
              >
                <IconSparkles className="w-4 h-4" />
                Configurar meu servidor agora
              </PurchaseModalTrigger>
            </div>
          </div>

          {/* Right Content - Image */}
          <CardImage
            featureName={activeFeature.name}
            imagePath={activeFeature.imagePath}
          />
        </div>
      </div>
    </div>
  );
}
