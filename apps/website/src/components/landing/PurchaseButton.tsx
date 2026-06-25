"use client";

import { useCreateCheckoutMutation } from "@/hooks/landing-page/useCreateCheckoutMutation";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface PurchaseButtonProps {
  planId: "basic" | "complete";
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function PurchaseButton({
  planId,
  children,
  className,
  variant = "default",
  size = "default",
}: PurchaseButtonProps) {
  const { mutateAsync, isPending } = useCreateCheckoutMutation();
  const router = useRouter();

  async function onClick() {
    (
      window as unknown as { fbq: (track: string, event: string) => void }
    ).fbq("track", "InitiateCheckout");

    try {
      const { checkoutUrl } = await mutateAsync({ planId });

      router.push(checkoutUrl);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao processar a compra";

      toast.error(errorMessage);
    }
  }

  return (
    <Button
      onClick={onClick}
      className={className}
      variant={variant}
      size={size}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
