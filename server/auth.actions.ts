"use server"

import { signIn } from "./auth"

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
  await signIn("signout", { redirect: false })
}
