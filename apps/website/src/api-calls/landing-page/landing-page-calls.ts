import { api } from "@/lib/axios";
import { CreateCheckoutResponse } from "@/types/checkout/checkout-types";

export async function createCheckoutSession({
  planId,
}: {
  planId: "basic" | "complete";
}) {
  const response = await api.post<CreateCheckoutResponse>("/create-checkout", {
    planId,
  });

  return response.data;
}
