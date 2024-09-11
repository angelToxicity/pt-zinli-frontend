import { Post } from "@/lib/definitions"
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { postType, postValidation } from "../../validations/post";
import { useSharedState } from "../../components/context";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
  } from "@/components/ui/form"

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Crypto } from "@/app/services/crypto"



type Props = {
    title:string
    title_button:string,
    openModal: (data:string|Post) => void
}

const defaultValues: Partial<postType> = {
    image:"",
    location:"",
    message:""
}

const crypto = new Crypto()

export function PostForm({title, title_button, openModal}:Props) {
    const { state, setState } = useSharedState();
    const [blob, setBlob] = useState<string|null>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let data = null
        if (state) {
            data = JSON.parse(crypto.decryptData(state))
        } else {
            data = JSON.parse(crypto.decryptData(localStorage.getItem("user")!))
            setState(localStorage.getItem("user")!)
        }

        const subscription = form.watch((value, { name, type }) => {
            if (name == "image" && type =="change") {
              const file = (document.getElementById(name) as HTMLInputElement).files![0];
              if (file) {
                toFile(file)
              }
            }
        })
        return () => subscription.unsubscribe()
    })

    const form = useForm<postType>({
        resolver: zodResolver(postValidation),
        defaultValues
    })
    
    const onSubmit:SubmitHandler<postType> = (values) => {
        values.image = blob?.toString()
        values.author = state
        values.status = "drafted"
        
        const data = {data: crypto.encryptData(JSON.stringify(values)), "method": "POST", "route": "/post/create"};
        setIsLoading(true)
        fetch("/pages/api/data",{
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
          if (r.message_err) {
            openModal(r.message_err)
        } else {
            openModal(r)
          }
        })
    }
    
    const toFile = (file:Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setBlob(reader.result?.toString());
        };
    }

    if (isLoading) {
        
    }

    return (
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>{title} post</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <div className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} method="post">
                        <div className="grid gap-2">
                            <FormField 
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Imagen</FormLabel>
                                <FormControl>
                                    <Input
                                    id="image"
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
                        <div className="grid gap-2 mt-3">
                            <FormField 
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Mensaje</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="message"
                                            type="text"
                                            placeholder="..."
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
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Lugar</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="location"
                                            type="text"
                                            placeholder="Caracas"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="mt-3">
                            <Button type="submit">{title_button}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>
        </DialogContent>
    )
}