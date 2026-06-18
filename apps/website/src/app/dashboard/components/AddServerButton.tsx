"use client";

import { Plus } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ServersModal from "./ServersModal";
import { useServersModal } from "@/hooks/dashboard/useServersModal";

export default function AddServerButton({
  tempTokenCookie,
}: {
  tempTokenCookie?: RequestCookie;
}) {
  const { onModalClose } = useServersModal();

  return (
    <>
      {tempTokenCookie ? (
        <Dialog onOpenChange={(open) => !open && onModalClose()}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Adicionar
            </Button>
          </DialogTrigger>

          <ServersModal tempTokenCookie={tempTokenCookie} />
        </Dialog>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link href={process.env.NEXT_PUBLIC_DISCORD_OAUTH_GUILDS_URL ?? ""}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Link>
        </Button>
      )}
    </>
  );
}
