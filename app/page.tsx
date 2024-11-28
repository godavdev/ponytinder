import { redirect } from "next/navigation"

const LandingPage = () => {
  redirect("/auth/login")
}
export default LandingPage
