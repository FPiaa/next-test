"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validateField = RegisterSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validateField.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already taken!" };

  await db.user.create({ data: { name, email, password: hashedPassword } });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Email sent!" };
}
