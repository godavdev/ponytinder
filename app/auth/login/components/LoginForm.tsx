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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from "@/server/auth.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageCircleHeart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const LoginForm = () => {
  const router = useRouter()

  const schema = z.object({
    phone: z.string().length(10, { message: "Debe de tener 10 caracteres" }),
    password: z
      .string()
      .min(6, { message: "Debe de tener minimo 6 caracteres" }),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })

  const action = async (formData: FormData) => {
    await form.handleSubmit(async () => {
      const data = Object.fromEntries(formData) as unknown as z.infer<
        typeof schema
      >
      const response = await login(data)
      if (response) {
        router.push("/app")
      } else {
        alert("Credenciales incorrectas")
      }
    })()
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="items-center">
        <MessageCircleHeart className="text-pink-500" />
        <CardTitle>PonyTinder</CardTitle>
        <CardDescription>Inicia sesión</CardDescription>
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
                <Link href="/auth/signup">Registrarse</Link>
              </Button>
              <Button type="submit">Iniciar sesión</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default LoginForm
