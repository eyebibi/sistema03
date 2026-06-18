import { auth } from "@/auth";
import { getCustomerDiscordIdFromDb } from "@/lib/getCustomerDiscordIdFromDb";
import Link from "next/link";
import ServersMenu from "./components/ServersMenu";
import { cookies } from "next/headers";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCirclesRelation } from "@tabler/icons-react";

export default async function DashboardPage() {
  const session = await auth();

  const customerEmail = session.user.email;

  const customerDiscordId = await getCustomerDiscordIdFromDb(customerEmail);

  const cookieStore = await cookies();

  const tempTokenCookie = cookieStore.get("tempToken");

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
      <div className="w-full flex sm:flex-row flex-col gap-5 items-center justify-center max-w-7xl mx-auto">
        <div className="gap-6 lg:gap-8">
          {/* Card "Como usar o bot" - primeiro em desktop, segundo em mobile */}
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="sm:text-2xl text-lg">
                Como usar o bot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted-foreground text-muted-foreground text-sm font-semibold shrink-0">
                    1
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="font-medium">
                      Adicione seu(s) servidor(es) à lista
                    </div>
                    <ServersMenu tempTokenCookie={tempTokenCookie} />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted-foreground bg-background text-muted-foreground text-sm font-semibold shrink-0">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">
                      Convide o bot para seu(s) servidor(es)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted-foreground bg-background text-muted-foreground text-sm font-semibold shrink-0">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">
                      Use o comando{" "}
                      <span className="bg-muted-foreground/10 font-mono p-2 rounded-sm text-sm break-all">
                        /configurar-servidor
                      </span>{" "}
                      para configurar seu servidor
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted-foreground bg-background text-muted-foreground text-sm font-semibold shrink-0">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">
                      Use o comando{" "}
                      <span className="bg-muted-foreground/10 font-mono p-2 rounded-sm text-sm break-all">
                        /editar-servidor
                      </span>{" "}
                      para editar seu servidor, se quiser
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card "Como convidar o bot" - separado abaixo em uma nova linha */}
        <div className="mt-6 lg:mt-8">
          <Card className="w-full max-w-2xl mx-auto lg:mx-0">
            <CardHeader>
              <CardTitle className="sm:text-2xl text-lg">
                Como convidar o bot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mt-1 mb-7">
                Você deve fornecer a permissão &quot;Administrador&quot;, para
                que o bot possa configurar o servidor. Se você sentir que isso
                não é seguro, você pode remover o bot após usá-lo.
              </p>
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href="https://discord.com/oauth2/authorize?client_id=1332423617761509398&permissions=8&integration_type=0&scope=bot"
                  target="_blank"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Clique aqui
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
