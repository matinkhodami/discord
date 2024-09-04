import { User } from "next-auth";
import { useSession } from "next-auth/react";

const useUserData = (): User | undefined => {
    const { data: session } = useSession();
    console.log("[USE-USER]", session);
    const userData = session?.user;
    return userData;
}

export default useUserData