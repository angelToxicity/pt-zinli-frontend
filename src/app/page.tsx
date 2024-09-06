import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//export const description = "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/wallpaper.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Ingrese sus credenciales
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="user">Usuario</Label>
              <Input
                id="user"
                type="user"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              ¿No tienes cuenta? &nbsp;
              <Link href="#" className="underline">
                Regístrate
              </Link>
              {/* <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Olvidaste tu contraseña
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
