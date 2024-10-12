// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Add the role property
  }
}

async jwt({ token, user }) {
    let token: any; // Define the token variable
    if (user) {
      token.role = user.role; // Now this should not throw an error
    }
    return token;
  }
