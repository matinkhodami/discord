import { auth } from "@/auth/auth"
import { User } from "next-auth"
const userData = async () => {
    const session = await auth()
    const userData = session?.user
    return userData
}

export default userData