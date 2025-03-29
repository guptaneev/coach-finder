import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authAdapter } from "@/lib/auth-adapter";
import { Session } from "next-auth";
import { AdapterUser } from "@auth/core/adapters";

export const authOptions = {
  adapter: authAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: AdapterUser }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
