import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from '../../../server/common/authSchema';
import * as bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  // Include user.id on session

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Creds',
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials)
          const result = await prisma.user.findFirst({
            where: { email },
          })
          if (!result) return null
          const isValidPassword = result.password !== null && bcrypt.compare(password, result.password)
          if (!isValidPassword) return null
          // console.log('result', result)
          return {
            id: result.id, email, name: result.name, userType: result.userType
          }
          // return result
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.sub = user.id
      }
      // console.log('token', token, user)
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.sub as string
      }
      // console.log('session details', { session: session })
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  secret: env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'light'
  }
};

export default NextAuth(authOptions);
