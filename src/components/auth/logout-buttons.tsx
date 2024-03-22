"use client";

import { logout } from "@/actions/logout";

export function LogoutButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="cursor-pointer" onClick={() => logout()}>
      {children}
    </span>
  );
}
