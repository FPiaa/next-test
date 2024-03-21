import { UserRole } from "@prisma/client";
declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    role: UserRole;
  }
}

import "next-auth/jwt";
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: UserRole;
  }
}
