"use server";

import { ServiceError } from "@/errors";
import { prisma } from "@discly/db";

export async function generatePasswordResetId(email: string) {
  try {
    const passwordResetId = await prisma.passwordResetId.create({
      data: {
        accountEmail: email,
      },
    });

    return {
      id: passwordResetId.id,
    };
  } catch (error) {
    throw new ServiceError({
      message: error.message || "Error creating password reset id.",
      stack: new Error().stack,
    });
  }
}
