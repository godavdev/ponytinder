import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

const SwipperButton = ({
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={cn(
        "p-4 rounded-full shadow-sm hover:shadow-lg transition-all border",
        className
      )}
      {...props}
    />
  )
}
export default SwipperButton
