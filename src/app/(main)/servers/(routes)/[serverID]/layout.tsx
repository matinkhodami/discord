import { getServerInfo } from "@/components/server/lib/getServer";
import ServerSideBar from "@/components/server/ServerSideBar";
import userData from "@/lib/user/userData";
import { redirect } from "next/navigation";
import React from "react";

const ServerIDlayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverID: string };
}) => {
  const profile = userData();
  if (!profile) redirect("/signin");
  const server = await getServerInfo(params.serverID);
  return (
    <div className="h-full w-full dark:rounded-md flex gap-2">
      <aside className="flex flex-col gap-2 w-60 h-full dark:bg-darkSecondary/20 bg-light dark:rounded-md border-r-2 border-lightPrimary dark:border-r-0 p-1">
        {server && <ServerSideBar server={server} />}
      </aside>
      <main className="bg-secondary w-full rounded-md">{children}</main>
    </div>
  );
};

export default ServerIDlayout;
