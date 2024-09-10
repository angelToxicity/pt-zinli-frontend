"use client"

import { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Crypto } from "../../services/crypto";
import { useSharedState } from "../../components/context";
import { ProfileForm } from "@/app/pages/profile/profile-form"
import { User } from "@/lib/definitions";
import { Spinner } from "@/app/components/spinner";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const crypto = new Crypto();

export default function SettingsProfilePage() {
    let user:User = {
        avatar: "",
        username: "",
        name: "",
        surname: "",
        role: ""
    }
    const { state, setState } = useSharedState();
    const [ data, setData ] = useState(user);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let data = null
        if (state) {
            data = JSON.parse(crypto.decryptData(state))
        } else {
            data = JSON.parse(crypto.decryptData(localStorage.getItem("user")!))
        }

        user.avatar = data.avatar
        user.username = data.username
        user.name = data.name
        user.surname = data.surname
        user.role = data.role
        setData(user)
        setIsLoading(false)
      }, [state, isLoading])

    if (isLoading) {
        return <div style={{position: "absolute", top: "50%", right: "50%", opacity: "1"}}><Spinner></Spinner></div>;
    }

    return (
            <div className="flex justify-center">
                <Card className="w-full max-w-sm">
                    {/* <CardHeader>
                        <CardTitle></CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader> */}
                    <CardContent className="pt-4">
                        <div className="space-y-6">
                            <div className="items-center text-center">
                                <h3 className="text-lg font-medium">Perfil</h3>
                                <p className="text-md text-muted-foreground mt-2">
                                    {data && data.name }
                                </p>
                            </div>
                            <div className='flex justify-center'>
                                {data && 
                                    <Avatar className='h-16 w-16'>
                                        <AvatarImage src={data.avatar} />
                                        <AvatarFallback>AR</AvatarFallback>
                                    </Avatar>
                                }
                            </div>
                            <Separator />
                            <ProfileForm avatar={data!.avatar} username={data!.username} name={data!.name} surname={data!.surname} role={data!.role}/>
                        </div>
                    </CardContent>
                </Card>
            </div>
    )
}