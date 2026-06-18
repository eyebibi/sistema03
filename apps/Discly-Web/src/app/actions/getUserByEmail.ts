"use server";

import { ServiceError } from "@/errors";
import { prisma } from "@discly/db";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    return user;
  } catch (error) {
    console.log(error);

    throw new ServiceError({
      message: error.message || "Error searching for user.",
      stack: new Error().stack,
    });
  }
}
