"use server"

import { signIn, signOut as signout } from "./auth"

interface Credentials {
  phone: string
  password: string
}

export const login = async ({ phone, password }: Credentials) => {
  try {
    await signIn("credentials", { phone, password, redirect: false })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const signOut = async () => {
  await signout({ redirect: false })
}
