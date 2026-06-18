"use client";

import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Server } from "@/types/dashboard/servers/servers-types";

interface ServerCardProps {
  server: Server;
  userEmail: string;
  serverInList: boolean;
}

export default function ServerCard(props: ServerCardProps) {
  const serverIconUrl = `https://cdn.discordapp.com/icons/${props.server.id}/${props.server.icon}.png`;
  const [imageError, setImageError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [serverIdSaved, setServerIdSaved] = useState(props.serverInList);

  function handleAddServerId(serverId: string) {
    startTransition(async () => {
      try {
        await api.post("/user/save-server-id", {
          customerEmail: props.userEmail,
          serverId,
        });
      } catch (error) {
        const errorData = error.response.data.error;
        toast.error(errorData.message || "Error", {
          description: errorData.action || "Please try again",
        });

        return;
      }

      // no error happpened, update the ui
      startTransition(() => {
        setServerIdSaved(true);
      });
    });
  }
  return (
    <form>
      <Card className="border-2 border-dotted border-primary flex flex-row justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          {imageError ? (
            <div className="w-[50px] h-[50px] rounded-md bg-muted flex items-center justify-center text-xl">
              {props.server.name[0].toUpperCase()}
            </div>
          ) : (
            <Image
              alt={`"${props.server.name}" icon image`}
              src={serverIconUrl}
              width={50}
              height={50}
              className="rounded-md"
              onError={() => setImageError(true)}
            />
          )}

          <p className="font-bold">{props.server.name}</p>
        </div>
        <Button
          type="button"
          disabled={isPending || serverIdSaved}
          onClick={() => handleAddServerId(props.server.id)}
        >
          {serverIdSaved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      </Card>
    </form>
  );
}
