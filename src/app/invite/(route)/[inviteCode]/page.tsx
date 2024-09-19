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

  const jointServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileID: profile.id,
        },
      },
    },
  });
  if (jointServer) {
    redirect(`/servers/${jointServer.id}`);
  }
  const existServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileID: profile.id,
        },
      },
    },
  });
  if (!existServer) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Server</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="default">Join</Button>
      </CardFooter>
    </Card>
  );
};

export default InviteCodepage;
