import { ServiceError } from "@/errors";
import { prisma } from "@discly/db";

export async function saveCustomerDiscordId(
  customerEmail: string,
  discordId: string,
) {
  try {
    await prisma.user.update({
      where: {
        email: customerEmail,
      },
      data: {
        discordUserId: discordId,
      },
    });
  } catch (error) {
    console.log(error.stack);

    return {
      error: new ServiceError({
        stack: error.stack || new Error().stack,
        action:
          error.action ||
          "Please, try again. If the error persists, contact the owner.",
        message: error.message || "Error saving discord ID to the database.",
      }),
    };
  }
}
