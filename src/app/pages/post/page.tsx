"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Post } from "@/lib/definitions"
import Image from "next/image"

import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function Component() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ list, setList ] = useState<Post[]>([])

    useEffect(() => {
        const posts = '/post/list/all'
        const fetchedData = async () => {
            const reqData = await fetch('/pages/api/data?posts='+posts,{
                method: 'GET'
                }).then(res => res.json())
            .then(r => {
                if (r.message_err) {
                    Swal.fire("Error", r.message_err, "error");
                    return false
                } else {
                    const res_color = r.map((e:Post) => {
                        switch (e.status) {
                            case "published":
                                e.color = "bg-lime-500"
                                break;
                            case "drafted":
                                e.color = "bg-yellow-300"
                                break;
                            case "deleted":
                                e.color = "bg-red-500"
                                break;
                            case "rejected":
                                e.color = "bg-orange-400"
                                break;
                        
                            default:
                                break;
                        }
                        return e
                    })
                    
                    setList(res_color)
                }
            })
            return reqData
        }
        fetchedData().then(() => setIsLoading(false))
      }, [open, isLoading])
    
    if (isLoading) {
        return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 items-center">
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>;
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 items-center">
            {list.map((l) => (
                <Card key={l._id} className="w-250">
                    <CardHeader>
                        <CardTitle>{l.message}</CardTitle>
                        <CardDescription>
                        {l.author.username +" - "+(l.location ? l.location : "N/A")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="overflow-hidden rounded-md flex justify-center">
                                    <Image
                                        src={l.image!}
                                        alt={l.location}
                                        width={250}
                                        height={330}
                                        className="h-auto w-auto object-cover transition-all hover:scale-105 portrait"
                                    />
                                </div>
                            </ContextMenuTrigger>
                        </ContextMenu>
                    </CardContent>
                </Card>
            ))}
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
}
