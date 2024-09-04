import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import { compare } from "bcryptjs";
import { getUserByEmail } from "./lib/getUser";
import { DefaultSession } from "next-auth";
import { signInSchema } from "@/Schema/user";

import authConfig from "@/auth/configAuth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    // jwt: ({ user, token }) => {
    //   console.log("[JWT]", {user, token})
    //   return token
    // }
    session: async ({session, token}) => {
      const user = await db.profile.findUnique({
        where: {
          id: token.sub
        }
      })
      if ( user ) {
        session.user = {
          ...session.user,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      }
      return session
    }  
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const validCredential = await signInSchema.safeParse(credentials);

          if (!validCredential.success) throw new Error("Invalid credentials!");
          const { email: validMail, password: validPass } =
            validCredential.data;

          let user = await getUserByEmail(validMail);
          if (!user) throw new Error("User not found!");

          const correctPass = await compare(validPass, user.password as string);
          if (!correctPass) throw new Error("Invalid password!");

          return user;
        } catch (error) {
          console.log('[AUTHJS_ERROR]: ', error)
          return null
        }
      },
    }),
  ],
});
