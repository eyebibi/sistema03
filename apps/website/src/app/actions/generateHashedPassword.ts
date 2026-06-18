"use server";

import bcrypt from "bcrypt";

export async function generateHashedPassword(rawPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(rawPassword, 12);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
}
