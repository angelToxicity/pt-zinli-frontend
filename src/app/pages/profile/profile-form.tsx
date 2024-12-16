"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User } from "@/lib/definitions";

export function ProfileForm({avatar, username, name, surname, role}: User) {
    
    const defaultValues: Partial<User> = {
      username: username,
      name: name,
      surname: surname,
      role: role == 'admin' ? 'Administrador' : 'Usuario',
      avatar: avatar
    }

    const form = useForm<User>({
        defaultValues
    })

    const onSubmit:SubmitHandler<User> = () => {

    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        disabled
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
                        disabled
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Input id="role" type="text" placeholder="shadcn" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
}