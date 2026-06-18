"use server";

import { ServiceError } from "@/errors";
import { prisma } from "@discly/db";

export async function getCustomerPlan(customerEmail: string) {
  try {
    const customerData = await prisma.user.findUnique({
      where: {
        email: customerEmail,
      },
      select: {
        plan: true,
      },
    });

    return {
      error: null,
      plan: customerData.plan,
    };
  } catch (error) {
    console.log(error.stack);

    return {
      plan: null,
      error: new ServiceError({
        stack: error.stack || new Error().stack,
        message: error.message || "Error",
        action: error.action || "Please, try again.",
      }).toJSON(),
    };
  }
}
