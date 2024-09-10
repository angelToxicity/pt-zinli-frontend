'use client';

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "../components/spinner";
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInType, signInValidation } from "../validations/sig-in";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from "@/components/ui/form"
import { Crypto } from "../services/crypto";

const defaultValues: Partial<signInType> = {
  username:"",
  password:"",
  confirm_password:"",
  name:"",
  surname:"",
  avatar:""
}

const crypto = new Crypto();
const api_url = process.env.NEXT_PUBLIC_API_URL;

export default function SignIn() {
  const router = useRouter()
  const [blob, setBlob] = useState<string|null>()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<signInType>({
    resolver: zodResolver(signInValidation),
    defaultValues
  })

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name == "avatar" && type =="change") {
        const file = (document.getElementById(name) as HTMLInputElement).files![0];
        toFile(file)
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const signIn:SubmitHandler<signInType> = (values) => {
    values.avatar = blob?.toString()
    const data = {data: crypto.encryptData(JSON.stringify(values))};
    setIsLoading(true)
    fetch(api_url+'/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((r) => {
      if (r.message) {
        setIsLoading(false)
        Swal.fire("Error", r.message, "error");
        return false
      }
      Swal.fire({
        title: "Exito",
        text: "Usuario registrado correctamente. Ingrese con sus credenciales",
        icon: "success",
        allowEscapeKey: false,
        allowOutsideClick:false
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(false)
          router.push("/")
        }
      });
      
    })
  }

  const toFile = (file:Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBlob(reader.result?.toString());
    };
  }

  return (
    <div>
      <div style={{position: "absolute", top: "50%", right: "50%", opacity: "1"}}>
        {isLoading && <Spinner></Spinner>}
      </div>
      <div className="flex items-center justify-center py-12 lg:min-h-[100vh] xl:min-h-[100vh]" style={isLoading ? {opacity: "0.5", pointerEvents: "none"} : {opacity: "1"}}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Registro de usuario</CardTitle>
            <CardDescription>
              Ingrese los datos solicitados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(signIn)} method="post">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField 
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                              <Input
                                id="name"
                                type="text"
                                placeholder="Angel"
                                {...field}
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                              <Input
                                id="surname"
                                type="text"
                                placeholder="Rodriguez"
                                {...field}
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2 mt-3">
                    <FormField 
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usuario</FormLabel>
                          <FormControl>
                              <Input
                                id="username"
                                type="text"
                                placeholder="user"
                                {...field}
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2 mt-3">
                    <FormField 
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
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
                  </div>
                  <div className="grid gap-2 mt-3">
                    <FormField 
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar contraseña</FormLabel>
                          <FormControl>
                              <Input
                                id="confirm_password"
                                type="password"
                                {...field}
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2 mt-3">
                    <FormField 
                      control={form.control}
                      name="avatar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avatar</FormLabel>
                          <FormControl>
                            <Input
                              id="avatar"
                              type="file"
                              accept="image/png image/jpeg, image/jpg"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>*formatos aceptados (png, jpeg, jpg)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full mt-5">
                    Registrarse
                  </Button>
                </form>
              </Form>
            </div>
            <div className="mt-4 text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/" className="underline">
                Inicia sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}