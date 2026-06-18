import { prisma } from "@discly/db";

async function validateUserId(userId: string) {
  try {
    const userData = await prisma.user.findFirst({
      where: {
        discordUserId: userId,
      },
    });

    return userData;
  } catch (error) {
    console.log((error as Error).stack);
    throw error;
  }
}

async function validateServerId(userId: string, serverId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        discordUserId: userId,
        serversIds: {
          has: serverId,
        },
      },
      select: {
        serversIds: true,
      },
    });

    return user;
  } catch (error) {
    console.log((error as Error).stack);
    throw error;
  }
}

export async function validateUsage(
  serverId: string,
  userId: string
): Promise<boolean> {
  const userValidation = await validateUserId(userId);
  const serverValidation = await validateServerId(userId, serverId);

  if (!userValidation || !serverValidation) return false;

  return true;
}
