import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from '../../../server/common/authSchema';

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
      async authorize(credentials, req) {
        const { email, password } = await loginSchema.parseAsync(credentials)
        const result = await prisma.user.findFirst({
          where: { email }
        })
        if (!result) return null;
        return result
      }
    })
  ],
  callbacks: {
    session({ session, token }) {
      console.log({ session, token })
      if (session.user) {
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log('token jwt from user', { token, user })
      if (user) {
        token.name = user.name;
        // token = user;
        token.user = user
      }
      return Promise.resolve(token);
    },

  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },

  theme: {
    colorScheme: 'light'
  }
};

export default NextAuth(authOptions);
