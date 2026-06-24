import { env } from "@/lib/private-env";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
