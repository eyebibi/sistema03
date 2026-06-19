import { auth } from "@/auth";
import { getCustomerDiscordIdFromDb } from "@/lib/getCustomerDiscordIdFromDb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconCirclesRelation } from "@tabler/icons-react";
import HowToAccordion from "./how-to-accordion";
import HowToInviteCard from "./how-to-invite-card";

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
            Conecte sua conta do Discord
          </h1>
          <p className="ml-[2px] my-2 text-sm">
            Você deve fazer isso para começar a usar o bot
          </p>
        </div>
        <div className="flex w-full h-[calc(100vh-12em)] items-center justify-center px-6">
          <Button className="w-full max-w-xs h-16">
            <IconCirclesRelation size={20} />
            <Link
              href={process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL}
              className="whitespace-pre-wrap"
            >
              Conectar com Discord
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5em)] px-4 py-6 flex flex-col items-center justify-center">
      <div className="w-full flex sm:flex-row flex-col gap-5 items-start justify-center max-w-7xl mx-auto">
        <div className="flex-1">
          <HowToAccordion />
        </div>

        <div className="flex-1">
          <HowToInviteCard />
        </div>
      </div>
    </div>
  );
}
