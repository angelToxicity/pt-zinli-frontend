"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

export default function Component() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 items-center">
        <Card>
        <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6">
            <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                id="name"
                type="text"
                className="w-full"
                defaultValue="Gamer Gear Pro Controller"
                />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                {/* <Textarea
                id="description"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                className="min-h-32"
                /> */}
            </div>
            </div>
        </CardContent>
        </Card>
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
    </div>
  )
}
