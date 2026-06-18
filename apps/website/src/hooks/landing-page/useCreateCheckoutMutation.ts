import { createCheckoutSession } from "@/api-calls/landing-page/landing-page-calls";
import { useMutation } from "@tanstack/react-query";

export function useCreateCheckoutMutation() {
  return useMutation({
    mutationFn: createCheckoutSession,
    retry: false,
  });
}
