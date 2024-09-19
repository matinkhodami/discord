import { db } from "@/lib/db";
// import initialProfile from "@/lib/initialProfile";
import userData from "@/lib/user/userData";
import { redirect } from "next/navigation";

import InitialModal from "@/components/modals/InitialModal";

export default async function Home() {
  const user = await userData();
  console.log("[HOME]: ", user);
  if (!user) {
    return redirect("/signin");
  }
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileID: user.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  console.log("[HOME]: ", user);
  return (
    // TODO: create a beautiful dialog full of animation
    <InitialModal />
  );
}
