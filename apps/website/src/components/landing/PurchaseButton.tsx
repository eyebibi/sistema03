"use client";

import { useCreateCheckoutMutation } from "@/hooks/landing-page/useCreateCheckoutMutation";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PurchaseButtonProps {
  planId: "basic" | "complete";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function PurchaseButton({
  planId,
  children,
  className,
  disabled,
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
    <button
      onClick={onClick}
      className={className}
      disabled={isPending || disabled}
    >
      {isPending ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
}
