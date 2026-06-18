import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SessionProvider } from "next-auth/react";
import ServersList from "./ServersList";
import { useServersModal } from "@/hooks/dashboard/useServersModal";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ServersModal({
  tempTokenCookie,
}: {
  tempTokenCookie: RequestCookie;
}) {
  const { fetchServers } = useServersModal();
  const {
    data: servers,
    isPending: serversLoading,
    isError: isServersLoadError,
    error: serversLoadError,
  } = useQuery({
    queryKey: ["servers"],
    queryFn: () => fetchServers(tempTokenCookie.value),
  });

  if (isServersLoadError) {
    toast.warning(serversLoadError.message, {
      description: String(serversLoadError.cause) ?? "",
    });

    return null;
  }

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col border-gray-700">
        <DialogHeader>
          <DialogTitle>Seus servidores</DialogTitle>
        </DialogHeader>
        <p className="text-yellow-600 dark:text-yellow-400 text-sm">
          Só selecione servidores que você tem permissões de administrador ou
          dono
        </p>
        <div className="flex flex-col gap-3 my-5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-800 max-h-[60vh] pr-2">
          {serversLoading ? (
            <Loader2 className="animate-spin size-12 mx-auto" />
          ) : (
            <ServersList servers={servers} />
          )}
        </div>
      </DialogContent>
    </SessionProvider>
  );
}
