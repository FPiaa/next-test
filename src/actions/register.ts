"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validateField = RegisterSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
}
