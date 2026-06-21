import { getStripe } from "@/lib/stripe";
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
      event = getStripe().webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET!,
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
    const creditsStr = checkoutSession.metadata?.credits as string | undefined;

    if (!userEmail || !creditsStr) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const credits = parseInt(creditsStr, 10);

    if (isNaN(credits) || credits <= 0) {
      return NextResponse.json({ error: "Invalid credits value" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { email: userEmail },
        data: { credits: { increment: credits } },
      }),
      prisma.fulfilledCheckoutSessions.create({
        data: { sessionId },
      }),
    ]);

    await logger.logPurchase({
      customerEmail: userEmail,
      plan: "CREDIT",
      paymentGateway: "STRIPE",
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return NextResponse.json({ message: "Credits added successfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 },
    );
  }
}
