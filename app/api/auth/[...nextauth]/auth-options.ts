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
        try {
          console.log('Authorize function called with credentials:', JSON.stringify(credentials, null, 2))

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password")
          }

          if (credentials.action === "signup") {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
              where: { email: credentials.email }
            })

            if (existingUser) {
              throw new Error("User already exists")
            }

            // Create new user
            const hashedPassword = await hash(credentials.password, 12)
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
                name: credentials.name || credentials.email.split('@')[0],
                role: (credentials.role as Role) || 'Student'
              }
            })

            console.log('New user created:', newUser.email)
            return newUser
          } else {
            // Login process
            const user = await prisma.user.findUnique({
              where: { email: credentials.email }
            })

            if (!user) {
              console.log('No user found with email:', credentials.email)
              return null
            }

            const isPasswordValid = await compare(credentials.password, user.password)

            if (!isPasswordValid) {
              console.log('Invalid password for user:', credentials.email)
              return null
            }

            console.log('User authenticated successfully:', user.email)
            return user
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
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
      console.log('JWT callback, token:', JSON.stringify(token, null, 2))
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as Role;
        session.user.name = token.name as string;
        session.user.id = token.id as string;
      }
      console.log('Session callback, session:', JSON.stringify(session, null, 2))
      return session;
    }
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  debug: true, // Keep this for now to help with debugging
}