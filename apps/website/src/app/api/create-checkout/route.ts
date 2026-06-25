import { stripe } from "@/lib/stripe";
import { env as publicEnv } from "@/lib/public-env";
import { env as privateEnv } from "@/lib/private-env";
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

    const { planId } = body;

    const priceId =
      planId === "basic"
        ? privateEnv.STRIPE_PRICE_BASIC_USD
        : privateEnv.STRIPE_PRICE_UNLIMITED_USD;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${publicEnv.NEXT_PUBLIC_BASE_URL || privateEnv.BASE_URL}/signin?purchase=success`,
      cancel_url: `${publicEnv.NEXT_PUBLIC_BASE_URL || privateEnv.BASE_URL}/?purchase=canceled`,
      metadata: {
        plan_id: planId,
      },
    });

    await logger.logCheckoutSessionCreation({
      customerEmail: "pending",
      plan: planId.toUpperCase() as "BASIC" | "COMPLETE",
      paymentGateway: "STRIPE",
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return NextResponse.json({ checkoutUrl: checkoutSession.url });
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
