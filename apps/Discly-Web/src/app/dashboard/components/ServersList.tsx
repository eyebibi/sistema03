import { Server } from "@/types/dashboard/servers/servers-types";
import ServerCard from "./ServerCard";
import { useSession } from "next-auth/react";
import { useServersList } from "@/hooks/dashboard/useServersList";
import { Loader2 } from "lucide-react";

interface ServersListProps {
  servers: Server[];
}

export default function ServersList(props: ServersListProps) {
  const { data } = useSession();
  const { serversIds, isLoadingServersIds } = useServersList();

  if (!props.servers) return null;

  if (props.servers.length === 0) {
    return <div>Você precisa estar ao menos em um servidor.</div>;
  }

  if (isLoadingServersIds) {
    return <Loader2 className="animate-spin size-12 mx-auto" />;
  }

  return props.servers.map((server) => {
    const serverInList = serversIds.data.includes(server.id);

    return (
      <ServerCard
        serverInList={serverInList}
        server={server}
        key={server.id}
        userEmail={data?.user?.email}
      />
    );
  });
}
