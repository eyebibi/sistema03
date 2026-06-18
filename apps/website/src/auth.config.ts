import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthConfig } from "next-auth";
import { signInFormSchema } from "./app/(auth)/signin/helpers";
import { getUserByEmail } from "./app/actions/getUserByEmail";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } =
          await signInFormSchema.parseAsync(credentials);

        const existingUser = await getUserByEmail(email);

        // if no user with that e-mail exists
        if (!existingUser) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          existingUser.password,
        );

        // if the password is not correct
        if (!passwordsMatch) {
          return null;
        }

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
