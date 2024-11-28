"use client"
import { Heart, X } from "lucide-react"
import PonyCard from "./PonyCard"
import SwipperButton from "./SwipperButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { likePony, rejectPony } from "@/server/ponys.action"
import { Pony } from "@prisma/client"

interface Props {
  initialPonys: Pony[]
}

const Swiper = ({ initialPonys }: Props) => {
  const [ponys, setPonys] = useState(initialPonys)
  const router = useRouter()
  const generalHandler = async () => {
    if (ponys.length > 2) {
      router.prefetch(ponys[2].imageUrl)
    }
    setPonys((ponys) => ponys.slice(1))
  }

  const rejectPonyHandler = async () => {
    const res = await rejectPony(ponys[0].id)
    console.log(res)
    generalHandler()
  }

  const likePonyHandler = async () => {
    const res = await likePony(ponys[0].id)
    console.log(res)
    generalHandler()
  }
  const end = ponys.length === 0

  return (
    <div className="max-w-md w-full h-full flex flex-col gap-4 items-center justify-center">
      {!end ? (
        <PonyCard
          age={ponys[0].age}
          carreer={ponys[0].carreer}
          name={ponys[0].name}
          imageUrl={ponys[0].imageUrl}
        />
      ) : (
        <div className="text-2xl font-semibold text-gray-500">
          ¡Te los acabaste! Regresa más tarde
        </div>
      )}
      {!end && (
        <div className="flex justify-around w-full ">
          <SwipperButton onClick={rejectPonyHandler}>
            <X className="text-red-500" />
          </SwipperButton>
          <SwipperButton onClick={likePonyHandler}>
            <Heart className="text-pink-500" />
          </SwipperButton>
        </div>
      )}
    </div>
  )
}
export default Swiper
