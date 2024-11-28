import { User as AuthjsUser } from "next-auth"
import { JWT as AUTHJWT } from "next-auth/jwt"

interface UserPayload {
  id: string
  name: string
  phone: string
}

declare module "next-auth" {
  interface Session {
    user: UserPayload
    expires: string
  }

  interface User extends AuthjsUser, UserPayload {}
}

declare module "next-auth/jwt" {
  interface JWT extends AUTHJWT, UserPayload {}
}
