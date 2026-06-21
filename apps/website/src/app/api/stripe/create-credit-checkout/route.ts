import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { CREDIT_PACKAGES } from "@/lib/stripe-credit-packages";
import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  credits: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
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

    const checkoutSession = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: pkg.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL}dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL}dashboard/billing?canceled=true`,
      customer_email: session.user.email,
      metadata: {
        userEmail: session.user.email,
        credits: String(credits),
      },
    });

    await logger.logCheckoutSessionCreation({
      customerEmail: session.user.email,
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
