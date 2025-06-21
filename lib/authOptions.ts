import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import type { NextAuthOptions } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Helper to generate a secure random string
const generateRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString("hex");
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            username: true,
            password: true,
            salt: true,
            encryptedKey: true,
          },
        });

        if (!user) return null;

        const hashedPassword = crypto
          .scryptSync(password, user.salt ?? "", 64)
          .toString("hex");

        if (hashedPassword !== user.password) return null;

        return {
          id: user.id,
          email: user.email,
          username: user.username ?? "",
          encryptedKey: user.encryptedKey ?? "",
          salt: user.salt ?? "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const { email } = user;

        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          // If the user exists, check if they have a linked Google account
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          if (!existingAccount) {
            // If no linked Google account exists, link it now
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }
        } else {
          // If the user doesn't exist, create a new user
          // Note: The adapter will handle account creation automatically
          const salt = generateRandomString(16);
          const randomPassword = generateRandomString(16);
          const hashedPassword = crypto.scryptSync(randomPassword, salt, 64).toString("hex");
          const encryptedKey = generateRandomString(32);
          const hashedEncryptedKey = crypto.scryptSync(encryptedKey, salt, 64).toString("hex");

          await prisma.user.create({
            data: {
              email,
              username: profile?.name || "User",
              password: hashedPassword,
              salt,
              encryptedKey: hashedEncryptedKey,
            },
          });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.encryptedKey = user.encryptedKey;
        token.salt = user.salt;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.encryptedKey = token.encryptedKey as string;
        session.user.salt = token.salt as string;
      }
    
      return session;
    },
    redirect() {
      return "/notes";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
};

export default authOptions;
