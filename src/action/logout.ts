"use server"
import { signOut } from "@/auth/auth"
import { redirect } from "next/navigation"
export default async function logout() {
    try {
        await signOut();
    } catch {}
    redirect("/signin")
}