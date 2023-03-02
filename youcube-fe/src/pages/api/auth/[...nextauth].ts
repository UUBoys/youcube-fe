/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { signInSchema } from "@/modules/utils/schemas/auth";

export const AUTH_ROUTES = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  index: "/",
};

export const authOptions: NextAuthOptions = {
  pages: AUTH_ROUTES,
  secret: process.env.NEXT_AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        password: {
          label: "Name",
          type: "password",
        },
      },
      async authorize(credentials) {
        const creds = await signInSchema.parseAsync(credentials);

        console.log(creds);
        return { id: "1", name: "Morzi", email: "" };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return (
        user.email?.endsWith("@edhance.cz") ||
        ["lobiklukas@gmail.com"].includes(user.email || "") ||
        false
      );
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      const sessionCopy = { ...session };

      if (sessionCopy.user) {
        sessionCopy.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      const tokenCopy = { ...token };
      if (user) {
        tokenCopy.id = user.id;
        tokenCopy.email = user.email;
      }

      return tokenCopy;
    },
  },
};

export default NextAuth(authOptions);
