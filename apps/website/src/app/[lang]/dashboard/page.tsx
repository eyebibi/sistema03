import { auth } from "@/auth";
import { env } from "@/lib/public-env";
import { getCustomerDiscordIdFromDb } from "@/lib/getCustomerDiscordIdFromDb";
import Link from "next/link";
import { IconCirclesRelation } from "@tabler/icons-react";
import HowToAccordion from "./how-to-accordion";
import BotStatusWidget from "./components/BotStatusWidget";
import QuickBalanceView from "./components/QuickBalanceView";

export default async function DashboardPage() {
  const session = await auth();

  const customerEmail = session.user.email;

  const customerDiscordId = await getCustomerDiscordIdFromDb(customerEmail);

  if (customerDiscordId?.error) {
    return (
      <div className="flex flex-col w-full h-[calc(100vh-5em)] items-center justify-center">
        <h1 className="font-bold text-4xl">
          {customerDiscordId?.error?.message || "Unknown error"}
        </h1>
        <p>{customerDiscordId?.error?.action || "Please, try again."}</p>
      </div>
    );
  }

  if (!customerDiscordId?.customerDiscordId) {
    return (
      <div>
        <div className="ml-6 my-5">
          <h1 className="font-bold sm:text-4xl text-xl">
            Connect your Discord account
          </h1>
          <p className="ml-[2px] my-2 text-sm">
            You must do this to start using the bot
          </p>
        </div>
        <div className="flex w-full h-[calc(100vh-12em)] items-center justify-center px-6">
          <Link
            href={env.NEXT_PUBLIC_DISCORD_OAUTH_URL}
            className="btn btn-primary w-full max-w-xs h-16"
          >
            <IconCirclesRelation size={20} />
            Connect with Discord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 max-w-7xl mx-auto">
      <div>
        <HowToAccordion />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white">Status</h2>
        <BotStatusWidget />
        <QuickBalanceView />
      </div>
    </div>
  );
}
