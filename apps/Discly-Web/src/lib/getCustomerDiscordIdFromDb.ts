import { ServiceError } from "@/errors";
import { prisma } from "@discly/db";

export async function getCustomerDiscordIdFromDb(customerEmail: string) {
  try {
    const customerData = await prisma.user.findUnique({
      where: {
        email: customerEmail,
      },
      select: {
        discordUserId: true,
      },
    });

    return {
      customerDiscordId: customerData.discordUserId,
      error: null,
    };
  } catch (error) {
    console.log(error.stack);

    return {
      customerDiscordId: null,
      error: new ServiceError({
        stack: error.stack || new Error().stack,
        action:
          error.action ||
          "Please, try again. If the error persists, contact the owner.",
        message: error.message || "Error requesting data from the database.",
      }),
    };
  }
}
