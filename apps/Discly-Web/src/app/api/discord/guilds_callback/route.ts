import { getDiscordTokenFromAuthCode } from "@/lib/getDiscordTokenFromAuthCode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const searchParams = request.nextUrl.searchParams;

  const discordCode = searchParams.get("code");

  // If there is no discord code, redirect to the dashboard
  if (!discordCode) {
    redirect("/dashboard");
  }

  const tempAccessToken = await getDiscordTokenFromAuthCode(
    discordCode as string,
    process.env.NEXT_PUBLIC_DISCORD_OAUTH_GUILDS_CALLBACK_URL,
  );

  if (tempAccessToken.error) {
    cookieStore.set("tempToken", "error");

    redirect("/dashboard");
  }

  // setting the cookie
  cookieStore.set("tempToken", tempAccessToken.data);

  redirect("/dashboard");
}
