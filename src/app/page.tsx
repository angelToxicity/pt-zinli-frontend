'use client';

import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "./components/spinner";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation, loginType } from "./validations/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Crypto } from "./services/crypto";
import Swal from "sweetalert2";
import { useSharedState } from "./components/context";

const crypto = new Crypto();
const defaultValues: Partial<loginType> = {
  username: "",
  password: ""
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { setState } = useSharedState();
  const [ datas, setData] = useState(null)
  const form = useForm<loginType>({
    resolver: zodResolver(loginValidation),
    defaultValues
  })

  const router = useRouter()

  const login:SubmitHandler<loginType> = async(values) => {
    const data = {data: crypto.encryptData(JSON.stringify(values)), method:'POST', route: "/login"};
    setIsLoading(true)
    await fetch('/pages/api/data',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(r => {
      if (r.data.message) {
        setIsLoading(false)
        Swal.fire("Error", r.data.message, "error");
        return false
      } else {
        localStorage.setItem("user", crypto.encryptData(JSON.stringify(r.data)))
        setState(crypto.encryptData(JSON.stringify(r.data)))
        setIsLoading(false)
        !datas ? setData(r.data) : setData(r.data)
        r.data.role == "admin" ? router.push("/pages/dashboard") : router.push("/pages/post")
      }
    }).catch((err) => {
      setIsLoading(false)
      Swal.fire("Error", err, "error")
    })
  }

  return (
    <div>
      <div style={{position: "absolute", top: "50%", right: "50%", opacity: "1"}}>
        {isLoading && <Spinner></Spinner>}
      </div>
      <div style={isLoading ? {opacity: "0.5", pointerEvents: "none"} : {opacity: "1"}}>
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(login)} method="post" >
                    <FormField 
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="grid my-5">
                          <FormLabel>Usuario</FormLabel>
                          <FormControl>
                              <Input
                                id="username"
                                type="username"
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
                        <FormItem className="grid my-5">
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                              <Input
                                id="password"
                                type="password"
                                {...field}
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Iniciar sesión
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                  ¿No tienes cuenta? &nbsp;
                  <Link href="/sign-in" className="underline">
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
      </div>
    </div>
  )
}
