"use client";

import { toast } from "sonner";
import { ClassValue } from "clsx";
import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpgradePlanButton({
  formClassName,
}: {
  formClassName?: ClassValue;
}) {
  // const [checkoutState, createCheckoutAndRedirectAction] = useActionState(
  //   createCheckoutAndRedirect.bind(null, {
  //     priceId,
  //     shouldLogClick: false,
  //     successUrl:
  //       process.env.NODE_ENV === "development"
  //         ? "http://localhost:3000/dashboard"
  //         : "https://discly.live/dashboard",
  //     customerEmail,
  //   }),
  //   null,
  // );

  // useEffect(() => {
  //   if (checkoutState?.error) {
  //     const { message, action } = checkoutState.error;

  //     toast.error(message, {
  //       description: action,
  //     });
  //   }
  // }, [checkoutState]);

  function toastImplementedSoon() {
    toast.warning("Esta funcionalidade ainda não está implementada.", {
      description:
        "Se deseja atualizar seu plano, entre em contato direto com o suporte.",
    });
  }

  return (
    <form
      // action={createCheckoutAndRedirectAction}
      className={`w-full ${String(formClassName)}`}
    >
      <Button
        variant="outline"
        size="sm"
        className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
        onClick={toastImplementedSoon}
        type="button"
      >
        <WandSparkles className="w-4 h-4" /> Atualizar plano
      </Button>
    </form>
  );
}
