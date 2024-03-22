import { db } from "@/lib/db";

export async function getVerificationTokenByEmail(email: string) {
  try {
    return await db.verificationToken.findFirst({ where: { email } });
  } catch (error) {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    return await db.verificationToken.findUnique({ where: { token } });
  } catch (error) {
    return null;
  }
}
