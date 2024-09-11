'use client';

import clsx from 'clsx';
import Link from "next/link"
import { MouseEvent, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { Package2, Menu } from "lucide-react"
import { useSharedState } from "../components/context";
import { Crypto } from "../services/crypto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Spinner } from "../components/spinner";

const crypto = new Crypto();

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  const path_arr = usePathname().split("/")
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [myRef, setRef] = useState(path_arr[path_arr.length - 1]);
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const { state } = useSharedState();

  useEffect(() => {
    if (state) {
      const data = JSON.parse(crypto.decryptData(state))
      setRole(data.role)
      setAvatar(data.avatar)
      setIsLoading(false)
    } else {
      const data = JSON.parse(crypto.decryptData(localStorage.getItem("user")!))
      setRole(data.role)
      setAvatar(data.avatar)
      setIsLoading(false)
    }
  }, [])

  const newRef = (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, newState:string):void => {
    event.preventDefault()
    setRef(newState)
    router.push("/pages/"+newState)
  }
  
  const profile = ():void => {
    router.push("/pages/profile")
  }
  
  const closeSession = async () => {
    const res = await fetch('/pages/api/session',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const r = await res.json()
    if (r == "ok") {
      localStorage.clear()
      router.push("/")
    }
  }
  
  return (
      !isLoading ?
        <div className="flex w-full flex-col min-h-screen">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              {role == 'admin' &&
                <Link
                  href="#"
                  onClick={(_event) => newRef(_event, 'dashboard')}
                  className={clsx('text-lg transition-colors hover:text-foreground', {'text-foreground': myRef === 'dashboard', 'text-muted-foreground': myRef != 'dashboard'})}
                >
                  Dashboard
                </Link>
              }
              <Link
                href="#"
                onClick={(_event) => newRef(_event, 'post')}
                className={clsx('text-lg transition-colors hover:text-foreground', {'text-foreground': myRef === 'post', 'text-muted-foreground': myRef != 'post'})}
              >
                Posts
              </Link>
              <Link
                href="#"
                onClick={(_event) => newRef(_event, 'manage')}
                className={clsx('text-lg transition-colors hover:text-foreground', {'text-foreground': myRef === 'manage', 'text-muted-foreground': myRef != 'manage'})}
              >
                Administración
              </Link>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className='bg-white'>
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-lg font-semibold pb-2"
                    >
                      <Package2 className="h-6 w-6" />
                      <span className="r-only">Menu</span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    <Separator />
                  </SheetDescription>
                </SheetHeader>
                <nav className="grid gap-6 text-lg font-medium pt-4">
                  <Link
                    href="#"
                    onClick={(_event) => newRef(_event, 'dashboard')}
                    className={clsx('text-lg transition-colors hover:text-foreground', {'text-foreground': myRef === 'dashboard', 'text-muted-foreground': myRef != 'dashboard'})}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    onClick={(_event) => newRef(_event, 'post')}
                    className={clsx('text-lg transition-colors hover:text-foreground', {'text-foreground': myRef === 'post', 'text-muted-foreground': myRef != 'post'})}
                  >
                    Posts
                  </Link>
                  <Link
                    href="#"
                    onClick={(_event) => newRef(_event, 'manage')}
                    className={clsx('text-lg transition-colors hover:text-foreground', {'text-foreground': myRef === 'manage', 'text-muted-foreground': myRef != 'manage'})}
                  >
                    Administración
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <div className='ml-auto flex-1 sm:flex-initial'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={profile}>Perfil</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={closeSession}>Cerrar sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
            {children}
          </div>
        </div>
        : 
        <div>
          <div style={{position: "absolute", top: "50%", right: "50%", opacity: "1"}}>
            <Spinner></Spinner>
          </div>
          <div style={{opacity: "0.5", pointerEvents: "none"}}></div>
        </div>
  )
}