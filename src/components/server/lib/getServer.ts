import { db } from "@/lib/db"
import { Server, Channel, Profile } from "@prisma/client"

export type ServerInfo = Server & {
    members: (Profile & {
        profile: Profile
    })[]
    channels: (Channel & {
        profile: Profile
    })[]
}

const getServerInfo = async (serverID: string): Promise<ServerInfo | null> => { 
    const server = await db.server.findUnique({
        where: {
            id: serverID
        },
        include: {
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            },
            channels: {
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    profile: true
                }
            }
        }
    })
    return server as ServerInfo | null
}

const getServers = async (userID: string): Promise<Server[]> => {
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileID: userID,
                }
            }
        }
    })
    return servers
}

export { getServers, getServerInfo }
