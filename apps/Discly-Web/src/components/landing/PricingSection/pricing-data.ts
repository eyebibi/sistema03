import { PricingCardData } from "@/types/pricing/pricing-types";

export const pricingData: PricingCardData[] = [
  {
    id: "basic-plan",
    title: "Plano Básico",
    description: "Tudo que você precisa para começar",
    price: 25,
    originalPrice: 30,
    currency: "BRL",
    features: [
      { text: "Acesso a tudo", included: true },
      { text: "Crie do zero ou edite seu server", included: true },
      { text: "Atualizações incluídas", included: true },
      { text: "Acesso vitalício", included: true },
      { text: "Re-configurações ilimitadas", included: true },
      { text: "Suporte 24/7", included: true },
      { text: "Garantia de 7 dias", included: true },
      { text: "Máximo de 2 servidores", included: false },
    ],
    buttonText: "Quero o plano básico",
  },
  {
    id: "unlimited-plan",
    title: "Plano Ilimitado",
    description: "Acesso ilimitado a tudo",
    price: 35,
    currency: "BRL",
    isPopular: true,
    badge: "Melhor oferta!",
    features: [],
    bundleItems: [
      {
        name: "🎉 Quantidade ilimitada de servidores",
        value: "R$10",
        description:
          "Você pode adicionar o bot a quantos servidores quiser, sem custos extras.",
      },
    ],
    buttonText: "Quero o plano ilimitado",
  },
];
