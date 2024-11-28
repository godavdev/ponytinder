import { listPonysWithoutMatch } from "@/server/ponys.action"
import Swiper from "./components/Swipper"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

const AppPage = async () => {
  const session = await auth()
  if (session === null) {
    redirect("/auth/login")
  }
  const ponys = await listPonysWithoutMatch()
  return (
    <div className="w-screen h-svh flex justify-center items-center p-4">
      <Swiper initialPonys={ponys} />
    </div>
  )
}
export default AppPage
