import { api } from "@/lib/axios";

export async function getUserDiscordServersIds() {
  const { data: responseData } = await api.get<{ data: string[] }>(
    "/user/get-discord-servers-ids",
  );

  return responseData;
}
