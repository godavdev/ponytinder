import { hash, compare } from "bcrypt"

const SALT_ROUNDS = 10

export const hashPassword = async (password: string) =>
  await hash(password, SALT_ROUNDS)

export const comparePassword = async (password: string, encrypted: string) =>
  await compare(password, encrypted)