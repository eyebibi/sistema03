"use server";

import { cookies } from "next/headers";

export async function deleteTempTokenCookie() {
  (await cookies()).delete("tempToken");
}
