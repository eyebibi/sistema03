import { stripe } from "@/lib/stripe";
import { env } from "@/lib/private-env";
import { prisma } from "@discly/db";
import { createCustomerAccount } from "@/lib/createCustomerAccount";
import { sendFulfillmentEmail } from "@/lib/sendFulfillmentEmail";
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
        env.STRIPE_WEBHOOK_SECRET_LANDING_PAGE,
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

    const payerEmail = (checkoutSession.customer_email as string) || undefined;
    const receiptEmail = checkoutSession.customer_details?.email || undefined;
    const email = payerEmail || receiptEmail;
    const planId = checkoutSession.metadata?.plan_id as string | undefined;

    if (!email || !planId) {
      return NextResponse.json({ error: "Missing email or plan_id" }, { status: 400 });
    }

    const plan = planId === "basic" ? "BASIC" : "COMPLETE";

    const { rawPassword } = await createCustomerAccount(email, plan);

    await sendFulfillmentEmail(email, rawPassword);

    await prisma.fulfilledCheckoutSessions.create({
      data: { sessionId },
    });

    await logger.logPurchase({
      customerEmail: email,
      plan,
      paymentGateway: "STRIPE",
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return NextResponse.json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 },
    );
  }
}
