import { env } from "@/lib/public-env";

export const config = {
  title: "Discly - AI-powered Discord server setup",
  description:
    "Discly is an AI Discord bot that sets up your server from scratch in 30 seconds. Perfect for communities, streamers, and businesses. Save hours and launch your ideal server effortlessly.",
  baseUrl: env.NEXT_PUBLIC_BASE_URL,
};
