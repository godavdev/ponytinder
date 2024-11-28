"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { signOut } from "@/server/auth.actions"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const ActionBar = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await signOut()
    router.push("/auth/login")
  }

  return (
    <Card className="top-8 left-0 right-0 mx-auto p-4 flex gap-4 absolute w-fit rounded-full">
      <Button
        onClick={handleLogout}
        className="rounded-full"
        size={"icon"}
      >
        <LogOut />
      </Button>
    </Card>
  )
}
export default ActionBar
