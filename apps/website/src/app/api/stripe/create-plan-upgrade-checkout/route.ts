import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { prisma } from "@discly/db";
import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  try {
    const session = await auth();

    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { plan: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.plan !== "BASIC") {
      return NextResponse.json(
        { error: "Already on the COMPLETE plan" },
        { status: 400 },
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: env.STRIPE_PRICE_PLAN_UPGRADE,
          quantity: 1,
        },
      ],
      success_url: `${env.NEXT_PUBLIC_BASE_URL || env.BASE_URL}/dashboard/account-settings?upgrade=success`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL || env.BASE_URL}/dashboard/account-settings?upgrade=canceled`,
      customer_email: email,
      metadata: {
        userEmail: email,
        plan: "COMPLETE",
      },
    });

    await logger.logCheckoutSessionCreation({
      customerEmail: email,
      plan: "COMPLETE",
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
