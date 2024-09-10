"use client"

import Image from "next/image"
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Crypto } from "../../services/crypto";
import { Button } from "@/components/ui/button"
import { Spinner } from "@/app/components/spinner";
import { PostForm } from "@/app/pages/manage/post-form"
import { Post } from "@/lib/definitions"
import { useSharedState } from "../../components/context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const crypto = new Crypto();

export default function Component() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ list, setList ] = useState<Post[]>([])
    const { state, setState } = useSharedState();

    useEffect(() => {
        let data = null
        if (state) {
            data = JSON.parse(crypto.decryptData(state))
        } else {
            data = JSON.parse(crypto.decryptData(localStorage.getItem("user")!))
        }

        const posts = data.role == 'admin' ? '/post/list/all' : '/post/list/'+data._id
        const fetchedData = async () => {
            const reqData = await fetch('/pages/api/data?posts='+posts,{
                method: 'GET'
                }).then(res => res.json())
            .then(r => {
                if (r.message) {
                    Swal.fire("Error", r.message, "error");
                    return false
                } else {
                    console.log(r)
                    setList(r)
                    // const res_color = r.map((e:Stats) => {
                    //     switch (e.statusId) {
                    //         case "published":
                    //             e.color = "bg-lime-500"
                    //             break;
                    //         case "drafted":
                    //             e.color = "bg-yellow-300"
                    //             break;
                    //         case "deleted":
                    //             e.color = "bg-red-500"
                    //             break;
                    //         case "rejected":
                    //             e.color = "bg-orange-400"
                    //             break;
                        
                    //         default:
                    //             break;
                    //     }
                    //     return e
                    // })
                    // setStats(res_color)
                }
            })
            return reqData
        }
        fetchedData().then(() => setIsLoading(false))
      }, [])
    
    if (isLoading) {
        return <div style={{position: "absolute", top: "50%", right: "50%", opacity: "1"}}><Spinner></Spinner></div>;
    }

    return (
        <div>
            <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <CardTitle className="mb-2">Mis Posts</CardTitle>
                            <CardDescription>
                                Visualiza todos tus post y su status!
                            </CardDescription>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex align-center">
                                    <Button>Agrega un Post</Button>
                                </div>
                            </DialogTrigger>
                            <PostForm title="Agregar" title_button="Guardar"></PostForm>
                        </Dialog>
                        
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] sm:table-cell">Image</TableHead>
                        <TableHead>Mensaje</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Likes</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Author
                        </TableHead>
                        <TableHead className="hidden md:table-cell">Fecha de creación</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            list.length === 0 ? 
                            <TableRow>

                                <TableCell colSpan={6} className="text-center">
                                    <p className="mt-3 text-lg text-muted-foreground">
                                        No posee posts
                                    </p>
                                </TableCell>
                            </TableRow>
                            
                            :
                            list.map((l) => (
                                <TableRow key={l._id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={l.image!}
                                        width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {l.message}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-lime-500" variant="outline">{l.status}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{l.likes?.length}</TableCell>
                                    <TableCell className="hidden md:table-cell">{l.author.username}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {l.create_at.toString()}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className=" text-xs text-muted-foreground">
                        Mostrando <strong>1-10</strong> de <strong>{list.length}</strong> posts
                    </div>
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" title="Atras" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" title="Siguiente" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardFooter>
                </Card>
            </div>
        </div>
    )
}
