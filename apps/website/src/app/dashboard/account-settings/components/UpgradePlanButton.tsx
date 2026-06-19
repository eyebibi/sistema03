"use client";

import { toast } from "sonner";
import { ClassValue } from "clsx";
import { WandSparkles } from "lucide-react";

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
    toast.warning("This feature is not yet implemented.", {
      description:
        "To upgrade your plan, please contact support directly.",
    });
  }

  return (
    <form
      // action={createCheckoutAndRedirectAction}
      className={`w-full ${String(formClassName)}`}
    >
      <button
        className="btn btn-outline btn-primary btn-sm"
        onClick={toastImplementedSoon}
        type="button"
      >
        <WandSparkles className="w-4 h-4" /> Upgrade plan
      </button>
    </form>
  );
}
