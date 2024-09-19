import NextAuth from "next-auth";
import authConfig from "@/auth/configAuth";
import { NextRequest } from "next/server";
import { PUBLIC_ROUTE, AUTH_ROUTE } from "@/routes";
const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const { pathname } = req.nextUrl;
  const isLogging = req.auth;
  console.log("[IS_LOGGING] : ", isLogging)
  const isPublic = PUBLIC_ROUTE.includes(pathname);
  if (isPublic && !isLogging)
    return Response.redirect(new URL("/signin", req.url));

  const isAuth = AUTH_ROUTE.includes(pathname);
  if (!!isLogging && isAuth) 
    return Response.redirect(new URL("/", req.url));
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
