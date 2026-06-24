import { ServiceError } from "@/errors";
import { env as publicEnv } from "@/lib/public-env";
import { env as privateEnv } from "@/lib/private-env";

export async function getDiscordTokenFromAuthCode(
  authCode: string,
  redirectUri: string,
) {
  try {
    const response = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      body: `client_id=${publicEnv.NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID}&client_secret=${privateEnv.DISCORD_OAUTH_CLIENT_SECRET}&grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}`,
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
