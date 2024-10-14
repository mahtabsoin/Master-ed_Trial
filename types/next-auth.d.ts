import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: "STUDENT" | "TEACHER"
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "STUDENT" | "TEACHER"
  }
}