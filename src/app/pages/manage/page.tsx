"use client"

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
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const crypto = new Crypto();

export default function Component() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ list, setList ] = useState<Post[]>([])
    const [ open, setOpen ] = useState(false);
    const [ role, setRole ] = useState("");
    const { state } = useSharedState();

    const openModalSub = (estado:boolean = true) => {
        setOpen(estado)
    }

    const changeStatus = async (status:string, id:string) => {
        setIsLoading(true)
        const body = JSON.stringify({data: {data: {status: status, _id: id},  route: "/post/status", method: "PATCH"} })
        await fetch('/pages/api/data', {
            method: 'PATCH',
            body: JSON.stringify(crypto.encryptData(body))
        })
        .then(res => res.json())
        .then(r => {
            setIsLoading(false)
            if (r.message_err) {
                Swal.fire("Error", r.message_err, "error");
                return false
            } else {
                const newList = list.map(e => {
                    if (e._id == id) {
                        e.status = status
                    }
                    return e
                })
                setList(newList)
            }
        })
    }
    
    const openModal = (data:string|Post) => {
        setOpen(false)

        if (typeof data === 'string') {
            Swal.fire("Error", data, "error");
        } else {
            Swal.fire({
                title: "Exito",
                text: "Post registrado correctamente",
                icon: "success",
                allowEscapeKey: false,
                allowOutsideClick:false
            }).then((result) => {
                if (result.isConfirmed) {
                    const newList = [...list]
                    newList.push(data)
                    setList(newList)
                }
            });
        }
    }

    useEffect(() => {
        let data = null
        if (state) {
            data = JSON.parse(crypto.decryptData(state))
        } else {
            data = JSON.parse(crypto.decryptData(localStorage.getItem("user")!))
        }

        setRole(data.role)

        const posts = data.role == 'admin' ? '/post/list/all' : '/post/list/'+data._id
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
                        <Dialog open={open} onOpenChange={openModalSub}>
                            <DialogTrigger asChild>
                                <div className="flex align-center">
                                    <Button>Agrega un Post</Button>
                                </div>
                            </DialogTrigger>
                            <PostForm title="Agregar" title_button="Guardar" openModal={openModal}></PostForm>
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
                                        <Avatar>
                                            <AvatarImage src={l.image!} />
                                            <AvatarFallback>AR</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {l.message}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={l.color} variant="outline">{l.description}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{l.likes?.length}</TableCell>
                                    <TableCell className="hidden md:table-cell">{l.author.username}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(l.create_at).toLocaleString('en-GB')}
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
                                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                            {role == "admin" && <DropdownMenuItem onClick={() => changeStatus("published", l._id!)}>Publicar</DropdownMenuItem>}
                                            {role == "admin" && <DropdownMenuItem onClick={() =>  changeStatus("rejected", l._id!)}>Rechazar</DropdownMenuItem>}
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() =>  changeStatus("deleted", l._id!)}>Eliminar</DropdownMenuItem>
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
