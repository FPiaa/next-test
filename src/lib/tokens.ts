import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 } from "uuid";
import { db } from "./db";

export async function generateVerificationToken(email: string) {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  return await db.verificationToken.create({ data: { token, expires, email } });
}
