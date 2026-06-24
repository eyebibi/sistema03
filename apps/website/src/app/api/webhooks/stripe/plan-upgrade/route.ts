import { stripe } from "@/lib/stripe";
import { env } from "@/lib/private-env";
import { prisma } from "@discly/db";
import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        env.STRIPE_WEBHOOK_SECRET_PLAN_UPGRADE,
      );
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ message: "Event ignored" });
    }

    const checkoutSession = event.data.object;

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json({ message: "Payment not completed, ignoring" }, { status: 400 });
    }

    const sessionId = checkoutSession.id;

    const alreadyFulfilled = await prisma.fulfilledCheckoutSessions.findUnique({
      where: { sessionId },
    });

    if (alreadyFulfilled) {
      return NextResponse.json({ message: "Already fulfilled" });
    }

    const userEmail = checkoutSession.metadata?.userEmail as string | undefined;
    const plan = checkoutSession.metadata?.plan as string | undefined;

    if (!userEmail || plan !== "COMPLETE") {
      return NextResponse.json({ error: "Missing or invalid metadata" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, plan: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.plan !== "BASIC") {
      return NextResponse.json({ message: "User already on COMPLETE plan, skipping" });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { email: userEmail },
        data: { plan: "COMPLETE" },
      }),
      prisma.fulfilledCheckoutSessions.create({
        data: { sessionId },
      }),
    ]);

    await logger.logPurchase({
      customerEmail: userEmail,
      plan: "COMPLETE",
      paymentGateway: "STRIPE",
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return NextResponse.json({ message: "Plan upgraded successfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 },
    );
  }
}
