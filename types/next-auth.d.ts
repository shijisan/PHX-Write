import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
 
  interface User extends DefaultUser {
    id: string;
    email: string;
    username: string | null;
    encryptedKey: string;
    salt: string;
  }

 
  interface Session {
    user: {
      id: string;
      email: string;
      username: string | null;
      encryptedKey: string;
      salt: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
 
  interface JWT {
    id: string;
    email: string;
    username: string | null;
    encryptedKey: string;
    salt: string;
  }
}