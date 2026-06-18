"use server";

import { NotFoundError } from "@/errors";
import { prisma } from "@discly/db";

export async function validatePasswordResetId(resetPasswordId: string) {
  try {
    const idFound = await prisma.passwordResetId.findUnique({
      where: {
        id: resetPasswordId,
      },
    });

    if (!idFound) {
      throw new NotFoundError({
        message: "The provided password reset id couldn't be found.",
        stack: new Error().stack,
      });
    }

    return {
      error: false,
    };
  } catch (error) {
    return {
      error: {
        message: error.message || "Invalid password reset id.",
        action:
          error.action ||
          "If you think this should work, please contact the owner.",
      },
    };
  }
}
