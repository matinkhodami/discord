import { auth } from "@/auth/auth"
const userData = async () => {
    const session = await auth()
    const userData = session?.user
    return userData
}

export default userData