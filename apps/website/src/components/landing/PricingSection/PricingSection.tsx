import { Check } from "lucide-react";
import PurchaseButton from "../PurchaseButton";
import { pricingData } from "./pricing-data";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
};

function formatPrice(price: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] || "$";
  return `${symbol}${price}`;
}

export default function PricingSection() {
  return (
    <section
      className="w-full justify-center flex flex-col gap-4 relative px-4 sm:px-6 lg:px-8"
      id="pricing"
      aria-labelledby="pricing-heading"
    >
      <header className="flex flex-col justify-center items-center mt-20 sm:mt-24 lg:mt-32 mb-12 sm:mb-14 lg:mb-16">
        <h2
          id="pricing-heading"
          className="text-gray-200 text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
        >
          Os planos atuais
        </h2>
        <p className="text-gray-400 mt-4">Pagamento único, sem mensalidades.</p>
      </header>

      <div
        className="flex flex-col lg:flex-row gap-6 sm:gap-8 max-w-6xl mx-auto"
        role="list"
      >
        {pricingData.map((card) => (
          <article
            key={card.id}
            className={`relative flex flex-col p-6 sm:p-8 rounded-2xl ${
              card.isPopular
                ? "bg-gradient-to-br from-background-lighter to-background-light border-2 border-transparent bg-clip-padding"
                : "bg-background-lighter border border-gray-700"
            } flex-1`}
            style={
              card.isPopular
                ? {
                    background: `
                      linear-gradient(135deg, var(--background-lighter), var(--background-light)) padding-box,
                      linear-gradient(135deg, #60a5fa, #a855f7, #10b981, #f59e0b) border-box
                    `,
                    border: "2px solid transparent",
                  }
                : {}
            }
            role="listitem"
            aria-labelledby={`plan-title-${card.id}`}
          >
            {/* Badge */}
            {card.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 rounded-full"
                  role="banner"
                  aria-label="Popular plan badge"
                >
                  {card.badge}
                </span>
              </div>
            )}

            {/* Header */}
            <header className="mb-4 sm:mb-6">
              <h3
                id={`plan-title-${card.id}`}
                className="text-gray-200 text-xl sm:text-2xl font-bold mb-2"
              >
                {card.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {card.description}
              </p>
            </header>

            {/* Pricing */}
            <div
              className="mb-6 sm:mb-8"
              role="group"
              aria-label="Pricing details"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className="text-3xl sm:text-4xl font-bold text-white"
                  aria-label={`Price: ${formatPrice(card.price, card.currency)} ${card.currency}`}
                >
                  {formatPrice(card.price, card.currency)}
                </span>
                <span className="text-gray-400 text-sm">{card.currency}</span>
                {card.originalPrice && (
                  <span
                    className="text-red-400 sm:text-lg line-through ml-2"
                    aria-label={`Original price: ${formatPrice(card.originalPrice, card.currency)} ${card.currency}`}
                  >
                    {formatPrice(card.originalPrice, card.currency)}
                  </span>
                )}
              </div>
            </div>

            {/* Features (for regular card) */}
            {!card.isPopular && (
              <ul
                className="mb-6 sm:mb-8 space-y-3 sm:space-y-4"
                role="list"
                aria-label="Plan features"
              >
                {card.features.map((feature, idx) => {
                  return feature.included ? (
                    <li key={idx} className="flex items-center gap-3">
                      <Check
                        className="w-4 sm:w-5 h-4 sm:h-5 text-green-400 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-300 text-xs sm:text-sm">
                        {feature.text}
                      </span>
                    </li>
                  ) : (
                    <li key={idx} className="flex items-center gap-3">
                      <Check
                        className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-yellow-300 text-xs sm:text-sm">
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* CTA Button */}
            <footer className="mt-auto">
              <PurchaseButton
                planId={card.id === "basic-plan" ? "basic" : "complete"}
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-semibold h-10 sm:h-12 rounded-full transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                size="lg"
              >
                ➜ {card.buttonText}
              </PurchaseButton>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
