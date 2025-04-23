import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback: ", { token, user, session });

      if (user) {
        return {
          ...token,
          id: user.id,
          admin: user.admin,
        };
      }
      return token;
    },

    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          admin: token.admin,
        },
      };

      return session;
    },
  },
  secret: process.env.JWT_SECRET,

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
