import { env } from "@/lib/private-env";
import { Preference } from "mercadopago";
import { mp } from "@/lib/mercadopago";
import { CreateCheckoutBody } from "@/types/checkout/checkout-types";

export async function createMercadoPagoCheckout({
  payerEmail,
  planId,
}: CreateCheckoutBody) {
  const preference = new Preference(mp);

  const preferenceData = await preference.create({
    body: {
      tracks: [
        {
          type: "facebook_ad",
          values: {
            pixel_id: "9834555996672298",
          },
        },
      ],
      items: [
        {
          id: planId,
          quantity: 1,
          title:
            planId === "basic"
              ? "Discly - Plano Básico"
              : "Discly - Plano Ilimitado",
          unit_price:
            planId === "basic"
              ? Number(env.DISCLY_BASIC_PLAN_PRICE)
              : Number(env.DISCLY_UNLIMITED_PLAN_PRICE),
        },
      ],
      payer: {
        email: payerEmail,
      },
      metadata: {
        payer_email: payerEmail,
        plan_id: planId,
      },
      notification_url: `${env.BASE_URL}/api/webhooks/mercadopago`,
      payment_methods: {
        excluded_payment_types: [
          {
            id: "ticket",
          },
        ],
      },
    },
  });

  return {
    checkoutUrl: preferenceData.init_point,
  };
}
