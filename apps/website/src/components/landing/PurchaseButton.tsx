"use client";

import { useCreateCheckoutMutation } from "@/hooks/landing-page/useCreateCheckoutMutation";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CreditCard, Loader2 } from "lucide-react";

interface PurchaseButtonProps {
  planId: "basic" | "complete";
  payerEmail: string;
  disabled?: boolean;
}

export default function PurchaseButton({
  planId,
  payerEmail,
  disabled = false,
}: PurchaseButtonProps) {
  const { mutateAsync, isPending } = useCreateCheckoutMutation();
  const router = useRouter();

  async function onClick() {
    (window as unknown as { fbq: (track: string, event: string) => void }).fbq(
      "track",
      "InitiateCheckout",
    );

    try {
      const { checkoutUrl } = await mutateAsync({ planId, payerEmail });

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
      className="w-full"
      disabled={disabled || isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <CreditCard />}
      {isPending ? "Processando..." : "Ir para o pagamento"}
    </Button>
  );
}
