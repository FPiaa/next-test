"use client";
import { logout } from "@/actions/logout";
import useCurrentUser from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  return (
    <div className="bg-white">
      {JSON.stringify(user)}
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
}
