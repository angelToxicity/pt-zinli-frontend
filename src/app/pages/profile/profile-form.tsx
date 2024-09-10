"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
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
import { useSharedState } from "../../components/context";
import { useState, useEffect } from 'react';
import { User, UserInterface } from "@/lib/definitions";
import { Crypto } from "@/app/services/crypto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const crypto = new Crypto();

export function ProfileForm({avatar, username, name, surname, role}: User) {
    let res:any
    const { state, setState } = useSharedState();
    const [ data, setData ] = useState<User>(res);
    
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

    let onSubmit:SubmitHandler<User> = (data) => {

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