import { createMercadoPagoCheckout } from "@/app/helpers/checkout/createMercadoPagoCheckout";
import { logger } from "@/lib/logger";
import {
  CreateCheckoutBody,
  createCheckoutBodySchema,
} from "@/types/checkout/checkout-types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body: CreateCheckoutBody = await request.json();

    createCheckoutBodySchema.parse(body);

    const { planId, payerEmail } = body;

    const { checkoutUrl } = await createMercadoPagoCheckout({
      planId,
      payerEmail,
    });

    await logger.logCheckoutSessionCreation({
      customerEmail: payerEmail,
      plan: planId.toUpperCase() as "BASIC" | "COMPLETE",
      paymentGateway: "MERCADOPAGO",
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        error: error.message || "Erro interno",
      },
      {
        status: 500,
      },
    );
  }
}
