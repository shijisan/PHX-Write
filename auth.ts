import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

const clientId = process.env.AUTH_GOOGLE_ID;
const clientSecret = process.env.AUTH_GOOGLE_SECRET

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google(
            { 
                clientId, 
                clientSecret 
            }
        ),
    ],
    callbacks: {
        async session({session, user}) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        }
    }
});