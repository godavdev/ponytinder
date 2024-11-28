import { listPonysWithoutMatch } from "@/server/ponys.action"
import Swiper from "./components/Swipper"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"
import ActionBar from "./components/ActionBar"

const AppPage = async () => {
  const session = await auth()
  console.log(session)
  if (session === null) {
    redirect("/auth/login")
  }
  const ponys = await listPonysWithoutMatch()
  return (
    <div className="w-screen h-svh flex justify-center items-center p-4 relative">
      <ActionBar />
      <Swiper initialPonys={ponys} />
    </div>
  )
}
export default AppPage
