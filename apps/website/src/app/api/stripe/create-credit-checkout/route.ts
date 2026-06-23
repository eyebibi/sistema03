import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { CREDIT_PACKAGES } from "@/lib/stripe-credit-packages";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  credits: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const { credits } = parsed.data;
    const pkg = CREDIT_PACKAGES[credits as keyof typeof CREDIT_PACKAGES];

    if (!pkg) {
      return NextResponse.json({ error: "Invalid credit package" }, { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: pkg.priceId,
          quantity: 1,
        },
      ],
      success_url: `${env.NEXT_PUBLIC_BASE_URL || env.BASE_URL}/dashboard/billing?success=true`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL || env.BASE_URL}/dashboard/billing?canceled=true`,
      customer_email: email,
      metadata: {
        userEmail: email,
        credits: String(credits),
      },
    });

    await logger.logCheckoutSessionCreation({
      customerEmail: email,
      plan: "CREDIT",
      paymentGateway: "STRIPE",
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 },
    );
  }
}
