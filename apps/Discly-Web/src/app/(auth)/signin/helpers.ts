import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Minimum password length is 8 characters.",
    })
    .max(20, {
      message: "Maximum password length is 20 characters.",
    }),
});
