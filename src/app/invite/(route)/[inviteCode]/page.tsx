import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { redirect } from "next/navigation";
import React from "react";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const InviteCodepage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  const profile = await userData();
  if (!profile) return redirect("/signin");

  const existServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
  });
  // TODO create a 404 page for invalid invite link
  if (!existServer) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Server</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter>
        <Button variant="default">Join</Button>
      </CardFooter>
    </Card>
  );
};

export default InviteCodepage;
