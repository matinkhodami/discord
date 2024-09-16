import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { redirect } from "next/navigation";
import React from "react";

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
  return <div>{params.inviteCode}</div>;
}; 

export default InviteCodepage;
