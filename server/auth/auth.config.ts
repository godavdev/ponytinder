import { NextAuthConfig } from "next-auth"

//  IMPORTANTE:Aqui solo funcionan cosas que soporten edge
export const authConfig: NextAuthConfig = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user }
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          phone: token.phone,
          name: token.name,
        },
      }
    },
  },
  pages: {
    signIn: "/auth/login",
  },
}
