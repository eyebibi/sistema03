"use server";

import { signIn } from "@/auth";

export async function handleSignIn(currentState, formData: FormData) {
  try {
    await signIn("credentials", formData);

    return {
      canRedirect: true,
    };
  } catch (error) {
    // ignoring errors related to NextJS' `redirect` function
    if (error.message === "NEXT_REDIRECT") {
      return {
        canRedirect: true,
      };
    }

    return {
      error: true,
    };
  }
}
