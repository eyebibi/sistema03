"use server";

import { ServiceError } from "@/errors";
import { prisma } from "@discly/db";

export async function getServersAmount(customerEmail: string) {
  try {
    const customerData = await prisma.user.findUnique({
      where: {
        email: customerEmail,
      },
      select: {
        serversIds: true,
      },
    });

    return {
      error: null,
      amount: customerData.serversIds.length,
    };
  } catch (error) {
    console.log(error.stack);

    return {
      amount: null,
      error: new ServiceError({
        stack: error.stack || new Error().stack,
        message: error.message || "Error",
        action: error.action || "Please, try again.",
      }).toJSON(),
    };
  }
}
