import { ServiceError } from "@/errors";
import { env } from "./env";

export async function getDiscordTokenFromAuthCode(
  authCode: string,
  redirectUri: string,
) {
  try {
    const response = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      body: `client_id=${env.NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID}&client_secret=${env.DISCORD_OAUTH_CLIENT_SECRET}&grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const responseBody = await response.json();

    return {
      data: responseBody.access_token,
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      error: new ServiceError({
        message: "Unknown error",
        action: "Please try again. If the error persists, contact the owner.",
        stack: new Error().stack,
      }).toJSON(),
    };
  }
}
