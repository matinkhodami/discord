"use server" 
import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { redirect } from "next/navigation";

export default async function join(serverID: string) {
    const user = await await userData()
    await db.server.update({
        where: {
            id: serverID,
        },
        data: {
            members: {
                create: {
                    profileID: user?.id as string,
                },
            },
        },
    });
    return redirect(`/servers/${serverID}`)
}