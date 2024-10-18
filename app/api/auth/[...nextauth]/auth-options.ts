import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, Role } from "@prisma/client"
import { compare, hash } from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" },
        role: { label: "Role", type: "text" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }

        if (credentials.action === "signup") {
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (existingUser) {
            throw new Error("User already exists")
          }

          const hashedPassword = await hash(credentials.password, 12)
          const user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              role: credentials.role as Role,
              name: credentials.name || credentials.email.split('@')[0],
            }
          })

          return user
        } else {
          // Login
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            throw new Error("No user found")
          }

          const isPasswordValid = await compare(credentials.password, user.password)

          if (!isPasswordValid) {
            throw new Error("Invalid password")
          }

          return user
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as Role;
        session.user.name = token.name as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt",
  },
}