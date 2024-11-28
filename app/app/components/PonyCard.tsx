import { Card } from "@/components/ui/card"
import Image from "next/image"

export interface PonyCardProps {
  name: string
  age: number
  carreer: string
  imageUrl: string
}
const PonyCard = ({ age, carreer, name, imageUrl }: PonyCardProps) => {
  return (
    <Card className="w-full h-[50svh] relative flex flex-col justify-end">
      <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
        <Image
          alt={`Imagen de ${imageUrl}`}
          src={imageUrl}
          fill
          className="object-cover "
        />
      </div>
      <div className="absolute bg-gradient-to-t from-gray-900 to-transparent inset-0 w-full h-full opacity-50 hover:opacity-70 transition-all rounded-lg" />
      <div className="p-4 relative">
        <h2 className="text-2xl font-semibold text-white">
          {name} - {age} años
        </h2>
        <p className="text-sm text-white">{carreer}</p>
      </div>
    </Card>
  )
}
export default PonyCard
