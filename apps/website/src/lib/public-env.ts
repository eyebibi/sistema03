import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_REDIRECT_URL: z.string().min(1),
  NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_EMAIL_FROM: z.string().min(1),
});

const rawEnv = {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_DISCORD_OAUTH_URL: process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL,
  NEXT_PUBLIC_DISCORD_OAUTH_REDIRECT_URL: process.env.NEXT_PUBLIC_DISCORD_OAUTH_REDIRECT_URL,
  NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID,
  NEXT_PUBLIC_EMAIL_FROM: process.env.NEXT_PUBLIC_EMAIL_FROM,
};

export const env = publicEnvSchema.parse(rawEnv);
