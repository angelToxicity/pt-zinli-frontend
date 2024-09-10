"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CircleCheckBig, DollarSign, Trash2, XCircle } from "lucide-react"
import { Spinner } from "../../components/spinner";
import { useState, useEffect } from 'react';
import { useSharedState } from "../../components/context";
import { Crypto } from "../../services/crypto";
import Swal from "sweetalert2";

const crypto = new Crypto();

export default function Dashboard() {
    const [ isLoading, setIsLoading ] = useState(false)
    const { state, setState } = useSharedState();

    useEffect(() => {
        let data = null
        if (state) {
            data = JSON.parse(crypto.decryptData(state))
        } else {
            data = JSON.parse(crypto.decryptData(localStorage.getItem("user")!))
        }

        // let posts = data.role == 'admin' ? '/post/stats' : '/post/'+data._id
        // const fetchedData = async () => {
        //     const reqData = await fetch('/pages/api/data?posts='+posts,{
        //         method: 'GET'
        //         }).then(res => res.json())
        //         .then(r => {
        //         if (r.message) {
        //             setIsLoading(false)
        //             Swal.fire("Error", r.message, "error");
        //             return false
        //         } else {
        //             localStorage.setItem("user", crypto.encryptData(JSON.stringify(r)))
        //             setState(crypto.encryptData(JSON.stringify(r)))
        //             setIsLoading(false)
        //         }
        //     })
        //     return reqData
        // }
        // fetchedData()
        // setData(user)
        setIsLoading(false)
      }, [state, isLoading])

    // useEffect(() => {
    //     let posts = 
    //     const f = await fetch('/pages/api/data?posts='+all,{
    //         method: 'GET'
    //         }).then(res => res.json())
    //         .then(r => {
    //         if (r.message) {
    //             setIsLoading(false)
    //             Swal.fire("Error", r.message, "error");
    //             return false
    //         } else {
    //             localStorage.setItem("user", crypto.encryptData(JSON.stringify(r)))
    //             setState(crypto.encryptData(JSON.stringify(r)))
    //             setIsLoading(false)
    //             setData(r)
    //             r.role == "admin" ? router.push("/pages/dashboard") : router.push("/pages/post")
    //         }
    //     })
    // }, [isLoading])

    return (
            <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {/* <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
                </div> */}
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-0" className="bg-lime-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                Aprobadas
                            </CardTitle>
                            <CircleCheckBig className="h-5 w-5 " />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45,231.89</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1" className="bg-yellow-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                Pendientes
                            </CardTitle>
                            <Search className="h-5 w-5 " />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2350</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2" className="bg-orange-400">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">No aprobadas</CardTitle>
                            <XCircle className="h-5 w-5 " />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12,234</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3" className="bg-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">Eliminadas</CardTitle>
                            <Trash2 className="h-5 w-5 " />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">573</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            Bienvenido
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Empieza a publicar de inmediato!
                        </p>
                        <Button className="mt-4">Agrega un Post</Button>
                    </div>
                </div>
            </div>
    )
}