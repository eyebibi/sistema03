import { NextRequest, NextResponse } from "next/server";
import { mp } from "@/lib/mercadopago";
import { Payment } from "mercadopago";
import { createCustomerAccount } from "@/lib/createCustomerAccount";
import { sendFulfillmentEmail } from "@/lib/sendFulfillmentEmail";
import { logger } from "@/lib/logger";

const payment = new Payment(mp);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type !== "payment") {
      return NextResponse.json(
        {
          message: "Evento não suportado",
        },
        {
          status: 400,
        },
      );
    }

    const paymentId = body.data.id;

    const paymentData = await payment.get({
      id: paymentId,
    });

    if (paymentData.status !== "approved") {
      return NextResponse.json(
        {
          message: "Pagamento não aprovado, ignorando...",
        },
        {
          status: 400,
        },
      );
    }

    const payerEmail = paymentData.metadata.payer_email;
    const planId = paymentData.metadata.plan_id as string;

    console.log("payerEmail", payerEmail);
    console.log("planId", planId);

    // creating the account for the user
    const { rawPassword } = await createCustomerAccount(
      payerEmail,
      planId.toUpperCase() as "BASIC" | "COMPLETE",
    );

    // send e-mail with account details
    await sendFulfillmentEmail(payerEmail, rawPassword);

    await logger.logPurchase({
      customerEmail: payerEmail,
      plan: planId.toUpperCase() as "BASIC" | "COMPLETE",
      timestamp: new Date().toLocaleString("pt-BR"),
      paymentGateway: "MERCADOPAGO",
    });

    return NextResponse.json({
      message: "Conta criada com sucesso",
    });
  } catch (error) {
    console.error(error);

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
