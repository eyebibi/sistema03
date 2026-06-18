import { api } from "@/lib/axios";
import { CreateCheckoutResponse } from "@/types/checkout/checkout-types";

export async function createCheckoutSession({
  payerEmail,
  planId,
}: {
  payerEmail: string;
  planId: "basic" | "complete";
}) {
  const response = await api.post<CreateCheckoutResponse>("/create-checkout", {
    payerEmail,
    planId,
  });

  return response.data;
}
