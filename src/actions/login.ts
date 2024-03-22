"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateField.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User does not exists!" };
  }

  if (!user.emailVerified) {
    const verification = await generateVerificationToken(user.email);
    await sendVerificationEmail(verification.email, verification.token);
    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default: {
          return { error: "Something went wrong!" };
        }
      }
    }

    throw error;
  }

  return { success: "Email sent!" };
}
