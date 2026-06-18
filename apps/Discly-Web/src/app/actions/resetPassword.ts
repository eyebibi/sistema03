"use server";

import { ValidationError } from "@/errors";
import { prisma } from "@discly/db";
import { generateHashedPassword } from "./generateHashedPassword";
import { logger } from "@/lib/logger";

export type ResetPasswordResponse = Awaited<ReturnType<typeof resetPassword>>;

export async function resetPassword(passwordResetId, newPassword) {
  try {
    if (newPassword.length < 8) {
      throw new ValidationError({
        message: "Invalid password.",
        action: "Password needs to be at least 8 characters long.",
        stack: new Error().stack,
      });
    }

    const idData = await prisma.passwordResetId.findUnique({
      where: {
        id: passwordResetId,
      },
      select: {
        accountEmail: true,
      },
    });

    const hashedPassword = await generateHashedPassword(newPassword);

    const accountEmail = idData.accountEmail;

    await prisma.user.update({
      where: {
        email: accountEmail,
      },
      data: {
        password: hashedPassword,
      },
    });

    // deleting (invalidating) the password reset id data
    await prisma.passwordResetId.delete({
      where: {
        id: passwordResetId,
      },
    });

    await logger.logPasswordReset({
      userEmail: accountEmail,
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error:
        error instanceof ValidationError
          ? error.toJSON()
          : {
              message: "Unknown error",
              action:
                "Please try again. If the error persists, contact the owner.",
            },
    };
  }
}
