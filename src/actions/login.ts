"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
}
