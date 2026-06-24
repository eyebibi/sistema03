import { env } from "@/lib/private-env";
import { MercadoPagoConfig } from "mercadopago";

export const mp = new MercadoPagoConfig({
  accessToken: env.MERCADOPAGO_ACCESS_TOKEN,
});
