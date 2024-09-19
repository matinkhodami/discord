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
import ReturnBackButton from "@/app/invite/(route)/(component)/ReturnBackButton";
import Image from "next/image";
import JoinButton from "../(component)/JoinButton";

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
    },
  });
  if (!existServer) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invite Invalid!</CardTitle>
          <CardDescription>
            This invite may be expired, or you might not have permission to
            join!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <video
            width="320"
            height="240"
            autoPlay
            loop
            playsInline
            muted
            preload="auto"
            className="rounded-full"
          >
            <source src="/lostInSpace.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
        <CardFooter>
          <ReturnBackButton />
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">
          Join <span className="text-darkPrimary">{existServer.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center h-[104px] w-full">
        <Image
          src={existServer.imageUrl}
          alt={existServer.name}
          width={100}
          height={100}
          className="rounded-full border-2 border-lightPrimary w-[100px] h-[100px]"
        />
      </CardContent>
      <CardFooter className="mt-4">
        <JoinButton serverID={existServer.id} />
      </CardFooter>
    </Card>
  );
};

export default InviteCodepage;
