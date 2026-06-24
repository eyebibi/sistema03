import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_REDIRECT_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_EMAIL_FROM: z.string().min(1),
});

export const env = publicEnvSchema.parse(process.env);
