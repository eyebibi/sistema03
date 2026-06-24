import { env } from "@/lib/public-env";
import axios from "axios";

export const api = axios.create({
  baseURL: `${env.NEXT_PUBLIC_BASE_URL}/api`,
});
