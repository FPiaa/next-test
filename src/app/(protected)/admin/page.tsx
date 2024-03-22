"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminPage() {
  const onApiRoute = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        console.log("ok");
        toast.success("Allowed API route");
      } else {
        console.log("nay");
        toast.error("Forbidden API route");
      }
    });
  };

  const onServerAction = () => {
    admin().then((response) => {
      if (response.success) {
        toast.success("Allowed server action");
      } else {
        toast.error("Forbidden server action");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center"></p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="Seeing adming stuff" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin-only api route</p>
          <Button onClick={onApiRoute}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin-only server action</p>
          <Button onClick={onServerAction}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
