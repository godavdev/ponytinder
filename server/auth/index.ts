import NextAuth, { Session } from "next-auth"
import { authConfig } from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { cache } from "react"
import credentials from "next-auth/providers/credentials"
import { prisma } from "../prisma"
import { comparePassword } from "./hash.utils"
import { Adapter } from "next-auth/adapters"

const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as unknown as Adapter,
  session: { strategy: "jwt" },
  providers: [
    credentials({
      credentials: {
        phone: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { phone, password } = credentials as {
          phone: string
          password: string
        }
        const foundUser = await prisma.pony.findUnique({
          where: { phone },
        })
        if (foundUser === null) {
          throw new Error()
        }
        const valid = await comparePassword(password, foundUser.password)
        if (!valid) {
          throw new Error()
        }
        return {
          id: foundUser.id,
          name: foundUser.name,
          phone: foundUser.phone,
          
        }
      },
    }),
  ],
})

const auths = cache(auth)
const authDev = async (): Promise<Session> =>
  (await auths()) as unknown as Session
export { authDev as auth, GET, POST, signIn, signOut }
