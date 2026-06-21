import { auth } from "@/auth";
import { getCustomerDiscordId } from "@/lib/getCustomerDiscordId";
import { getDiscordTokenFromAuthCode } from "@/lib/getDiscordTokenFromAuthCode";
import { saveCustomerDiscordId } from "@/lib/saveCustomerDiscordId";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DiscordCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const customerEmail = session.user.email;

  const parameters = await searchParams;

  const discordCode = parameters.code;

  // If there is no discord code, redirect to the dashboard
  if (!discordCode) {
    redirect("/dashboard");
  }

  const accessToken = await getDiscordTokenFromAuthCode(
    discordCode as string,
    process.env.NEXT_PUBLIC_DISCORD_OAUTH_REDIRECT_URL,
  );

  const discordId = await getCustomerDiscordId(accessToken.data);

  const saveDiscordId = await saveCustomerDiscordId(
    customerEmail,
    discordId.customerDiscordId,
  );

  if (accessToken?.error || discordId?.error || saveDiscordId?.error) {
    return (
      <main>
        <nav className="navbar">
          <Link className="flex gap-2" href="/dashboard">
            <ArrowLeft />
            Voltar para o dashboard
          </Link>
        </nav>

        <div className="flex flex-col gap-5 items-center justify-center w-full h-[calc(100vh-4em)]">
          <h1 className="font-bold text-4xl">
            {accessToken.error?.message || "Unknown error"}
          </h1>
          <p>{accessToken.error?.action || "Please, try again."}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <nav className="navbar">
        <Link
          className="btn btn-ghost flex p-5 rounded-full transition-colors hover:bg-base-300/20 max-w-fit"
          href="/dashboard"
        >
          <ArrowLeft />
          Voltar para o dashboard
        </Link>
      </nav>
      <div className="flex flex-col gap-5 items-center justify-center w-full h-[calc(100vh-4em)] sm:px-0 px-6 text-center">
        <h1 className="font-bold text-4xl">Sucesso!</h1>
        <p>
          Seu ID do Discord foi salvo. Agora você pode configurar seu servidor
          no dashboard.
        </p>
      </div>
    </main>
  );
}
