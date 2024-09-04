import { db } from "@/lib/db";

export const getUserById = async (userId: string) => {  
    try {
        const user = await db.profile.findUnique({
            where: {
                id: userId
            }
        })
        return user
    } catch {
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user =  await db.profile.findUnique({
            where: {
                email: email
            }
        })
        return user
    } catch {
        return null
    }
}