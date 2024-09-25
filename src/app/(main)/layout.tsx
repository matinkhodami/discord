import { getServers } from "@/components/server/lib/getServer";
import NavigationSideBar from "@/components/server/navigation-sidebar";
import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { redirect } from "next/navigation";
const ServersLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await userData();
  if (!user) redirect("/signin")
  const servers = await getServers(user?.id);
  return (
    <main className="h-screen w-screen flex dark:gap-2 dark:p-2 bg-light dark:bg-dark">
      <NavigationSideBar servers={servers} />
      {children}
    </main>
  );
};

export default ServersLayout;
