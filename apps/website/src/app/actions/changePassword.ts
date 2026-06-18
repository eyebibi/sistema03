"use server";

import { AuthorizationError } from "@/errors";
import { prisma } from "@discly/db";
import { z, ZodError } from "zod";
import { generateHashedPassword } from "./generateHashedPassword";
import bcrypt from "bcrypt";
import { logger } from "@/lib/logger";

const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(8).max(20),
  newPassword: z.string().min(8).max(20),
});

export type ChangePasswordResponse = Awaited<ReturnType<typeof changePassword>>;

export async function changePassword(
  customerEmail: string,
  formState,
  formData: FormData,
) {
  try {
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    // validate form data
    changePasswordFormSchema.parse({
      currentPassword,
      newPassword,
    });

    // check if current password is correct
    const customerData = await prisma.user.findUnique({
      where: {
        email: customerEmail,
      },
      select: {
        password: true,
      },
    });

    if (!customerData.password)
      throw new AuthorizationError({
        message: "Unauthorized",
        action: "Check your data",
        stack: new Error().stack,
      });

    const passwordsMatch = await bcrypt.compare(
      currentPassword as string,
      customerData.password,
    );

    if (!passwordsMatch)
      throw new AuthorizationError({
        message: "Incorrect password",
        stack: new Error().stack,
        action: "Your current password doesn't match.",
      });

    // hash new password
    const hashedNewPassword = await generateHashedPassword(
      newPassword as string,
    );

    // set new password
    await prisma.user.update({
      where: {
        email: customerEmail,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    // log event
    await logger.logPasswordChange({
      userEmail: customerEmail,
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    if (error instanceof AuthorizationError) {
      const errorDetails = error.toJSON();
      return {
        ...errorDetails,
        success: false,
      };
    }

    if (error instanceof ZodError) {
      const errorDetails = {
        message: "Invalid password!",
        action: error.issues[0].message,
      };

      return {
        ...errorDetails,
        success: false,
      };
    }

    return {
      success: false,
      message: error.message || "Unknown error",
      action:
        error.action ||
        "If you think this should work, please contact the owner.",
    };
  }
}
