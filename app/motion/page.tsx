"use client"
import { motion } from "motion/react"
const MotionPage = () => {
  return (
    <div className="min-h-screen flex w-full justify-center items-center">
      <motion.div
        initial={{ opacity: 0, translateY: "100%", scale: 0.4, rotate: 45 }}
        animate={{
          opacity: 1,
          scale: 1,
          translateY: "0%",
          rotate: 0,
          transition: {
            delay: 1,
          },
        }}
        className="size-96 bg-purple-500 rounded-lg"
      />
    </div>
  )
}
export default MotionPage
