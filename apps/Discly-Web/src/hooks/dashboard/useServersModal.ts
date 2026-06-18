import { deleteTempTokenCookie } from "@/app/dashboard/actions/deleteTempTokenCookie";
import { Server } from "@/types/dashboard/servers/servers-types";
import { toast } from "sonner";

export function useServersModal() {
  async function onModalClose() {
    await deleteTempTokenCookie();
  }

  async function fetchServers(token: string): Promise<Server[]> {
    if (!token)
      throw new Error("Token do Discord expirado ou inválido", {
        cause: "Atualize a página e tente novamente",
      });

    const serversResponse = await fetch(
      "https://discordapp.com/api/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!serversResponse.ok) {
      toast.error(
        "Não foi possível realizar a conexão com o serviço do Discord.",
        {
          description: "Por favor, tente novamente.",
        },
      );

      return;
    }

    const serversResponseBody = await serversResponse.json();

    if (!serversResponseBody)
      throw new Error("Resposta inválida recebida do Discord.");

    return serversResponseBody;
  }

  return {
    onModalClose,
    fetchServers,
  };
}
