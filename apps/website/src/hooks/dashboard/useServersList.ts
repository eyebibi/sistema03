import { getUserDiscordServersIds } from "@/api-calls/dashboard/dashboard-calls";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export function useServersList() {
  const {
    data: serversIds,
    isError: isSevrersIdsError,
    error: serversIdsError,
    isPending: isLoadingServersIds,
  } = useQuery({
    queryKey: ["serversIds"],
    queryFn: getUserDiscordServersIds,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSevrersIdsError) {
      toast.error(serversIdsError.message, {
        description: String(serversIdsError.cause) || "",
      });

      return;
    }
  }, [isSevrersIdsError, serversIdsError]);

  return {
    serversIds,
    isLoadingServersIds,
  };
}
