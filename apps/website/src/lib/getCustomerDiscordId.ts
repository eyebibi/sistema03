import { UnknownErrror } from "@/errors";

export async function getCustomerDiscordId(accessToken: string) {
  try {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    const customerDiscordId = data.id;

    if (!customerDiscordId) {
      throw new UnknownErrror({
        stack: new Error().stack,
        action: "Please, try again.",
        message: "Unknown error",
      });
    }

    return {
      customerDiscordId,
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      customerDiscordId: null,
      error: new UnknownErrror({
        stack: error.stack || new Error().stack,
        action: error.action || "Please, try again.",
        message: error.message || "Unknown error",
      }).toJSON(),
    };
  }
}
