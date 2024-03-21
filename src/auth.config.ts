import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const validateField = LoginSchema.safeParse(credentials);
        if (validateField.success) {
          const { email, password } = validateField.data;
          const user = await getUserByEmail(email);
          if (!user) return null;

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
    Github,
  ],
} satisfies NextAuthConfig;
