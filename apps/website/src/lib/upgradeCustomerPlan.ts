"use server";

import { ServiceError } from "@/errors";
import { prisma } from "@discly/db";

export async function upgradeCustomerPlan(customerEmail: string) {
  try {
    await prisma.user.update({
      where: {
        email: customerEmail,
      },
      data: {
        plan: "COMPLETE",
      },
    });
  } catch (error) {
    const formattedError = new ServiceError({
      message: error.message || "Error upgrading customer plan.",
      stack: new Error().stack,
      action:
        "Check the customer data. Did he use an e-mail addres that was already used?",
    });

    // logging errors
    console.log(error);
    console.log(error.stack);
    console.log(formattedError);

    throw formattedError;
  }
}
