"use server"

import { auth } from "./auth"
import { login } from "./auth.actions"
import { hashPassword } from "./auth/hash.utils"
import { prisma } from "./prisma"

interface Pony {
  id: string
  name: string
  phone: string
  semester: number
  age: number
  carreer: string
  description: string
  password: string
  imageUrl: string
}

export const createPony = async ({
  age,
  carreer,
  description,
  name,
  password,
  phone,
  semester,
  imageUrl,
}: Omit<Pony, "id">) => {
  try {
    console.log(age,
      carreer,
      description,
      name,
      password,
      phone,
      semester,
      imageUrl,)
    await prisma.pony.create({
      data: {
        age: Number(age),
        carreer,
        description,
        name,
        phone,
        password: await hashPassword(password),
        semester: Number(semester),
        imageUrl,
      },
    })
    await login({ phone, password })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const listAllPonys = async (): Promise<Pony[]> => {
  try {
    return await prisma.pony.findMany()
  } catch (error) {
    console.log(error)
    return []
  }
}

export const listPonysWithoutMatch = async () => {
  try {
    const { user } = await auth()
    return await prisma.pony.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: user.id,
            },
          },
          {
            Matched: {
              none: {
                matcherId: user.id,
              },
            },
          },
          {
            Matcher: {
              none: {
                matchedId: user.id,
                status: {
                  in: ["REJECTED", "ACCEPTED"],
                },
              },
            },
          },
        ],
      },
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export const likePony = async (id: string) => {
  try {
    const { user } = await auth()
    const hasPending = await prisma.match.findFirst({
      where: {
        AND: [
          { status: "PENDING" },
          {
            matcherId: id,
            matchedId: user.id,
          },
        ],
      },
    })
    if (hasPending === null) {
      await prisma.match.create({
        data: {
          matcherId: user.id,
          matchedId: id,
          status: "PENDING",
        },
      })
      return "CREATED_PENDING"
    }
    await prisma.match.update({
      where: {
        id: hasPending.id,
      },
      data: {
        status: "ACCEPTED",
      },
    })
    return "ACCEPTED"
  } catch (error) {
    console.log(error)
  }
}

export const rejectPony = async (id: string) => {
  try {
    const { user } = await auth()
    const hasPending = await prisma.match.findFirst({
      where: {
        AND: [
          { status: "PENDING" },
          {
            matchedId: user.id,
            matcherId: id,
          },
        ],
      },
    })
    if (hasPending === null) {
      await prisma.match.create({
        data: {
          matcherId: user.id,
          matchedId: id,
          status: "REJECTED",
        },
      })
      return "CREATED_REJECTED"
    }
    await prisma.match.update({
      where: {
        id: hasPending.id,
      },
      data: {
        status: "REJECTED",
      },
    })
    return "REJECTED"
  } catch (error) {
    console.log(error)
  }
}
