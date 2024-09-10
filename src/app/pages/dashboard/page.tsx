"use client"

import Swal from "sweetalert2";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CircleCheckBig, Trash2, XCircle } from "lucide-react"
import { useState, useEffect } from 'react';
import { useSharedState } from "../../components/context";
import { Crypto } from "../../services/crypto";
import { Spinner } from "@/app/components/spinner";

const crypto = new Crypto();

type Stats = {
    "statusId": string,
    "count": number,
    "color": string,
    "icon": string,
    "description": string
}

export default function Dashboard() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ stats, setStats ] = useState<Stats[]>([])
    const { state, setState } = useSharedState();

    useEffect(() => {
        let data = null
        if (state) {
            data = JSON.parse(crypto.decryptData(state))
        } else {
            data = JSON.parse(crypto.decryptData(localStorage.getItem("user")!))
        }

        const posts = data.role == 'admin' ? '/post/stats' : '/post/'+data._id
        const fetchedData = async () => {
            const reqData = await fetch('/pages/api/data?posts='+posts,{
                method: 'GET'
                }).then(res => res.json())
                .then(r => {
                if (r.message) {
                    setIsLoading(false)
                    Swal.fire("Error", r.message, "error");
                    return false
                } else {
                    const res_color = r.map((e:Stats) => {
                        switch (e.statusId) {
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
                    setStats(res_color)
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
            <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {stats.map((item, i) => (
                    <Card x-chunk={"dashboard-01-chunk-"+i} className={item.color} key={item.statusId}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                {item.description}
                            </CardTitle>
                            <CircleCheckBig className={'h-5 w-5' + ' ' + (item.statusId != 'published' ? 'hidden' : '')}  />
                            <Search className={'h-5 w-5' + ' ' + (item.statusId != 'drafted' ? 'hidden' : '')} />
                            <XCircle className={'h-5 w-5' + ' ' + (item.statusId != 'rejected' ? 'hidden' : '')}  />
                            <Trash2 className={'h-5 w-5' + ' ' + (item.statusId != 'deleted' ? 'hidden' : '')}  />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.count}</div>
                        </CardContent>
                    </Card>
                ))}
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