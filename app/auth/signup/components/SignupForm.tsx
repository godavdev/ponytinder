"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPony } from "@/server/ponys.action"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageCircleHeart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const SignupForm = () => {
  const router = useRouter()

  const schema = z.object({
    name: z.string().min(3, { message: "Debe de tener minimo 3 caracteres" }),
    phone: z.string().length(10, { message: "Debe de tener 10 caracteres" }),
    semester: z.coerce.number().max(12, { message: "Debe de ser menor a 12" }),
    age: z.coerce.number().min(18, { message: "Debe de ser mayor a 18" }),
    carreer: z.string(),
    description: z.string(),
    imageUrl: z.string().url({ message: "Necesita ser un URL" }),
    password: z
      .string()
      .min(6, { message: "Debe de tener minimo 6 caracteres" }),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      semester: "" as unknown as number,
      age: "" as unknown as number,
      carreer: "",
      description: "",
      password: "",
      imageUrl: "",
    },
  })

  const action = async (formData: FormData) => {
    await form.handleSubmit(async () => {
      const data = Object.fromEntries(formData) as unknown as z.infer<
        typeof schema
      >
      const response = await createPony(data)
      if (response) {
        router.push("/app")
      } else {
        alert("Ocurrio un error")
      }
    })()
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="items-center">
        <MessageCircleHeart className="text-pink-500" />
        <CardTitle>PonyTinder</CardTitle>
        <CardDescription>Crea una cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Form */}
        <Form {...form}>
          <form
            action={action}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu nombre"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url de tu imagen</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu url de imagen"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingresa tu descripcion"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta será la descripcion que se vea
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carreer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carrera</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu carrera"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semestre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu semestre"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu edad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de telefono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu número de telefono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-between pt-4">
              <Button
                variant="outline"
                asChild
              >
                <Link href="/auth/login">Iniciar sesión</Link>
              </Button>
              <Button type="submit">Registrarse</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default SignupForm
