import type { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export async function GET(req:NextRequest, res:Response) {
    const cookieStore = cookies()
    cookieStore.delete('id')

    return Response.json("ok", {
        status: 200
    })
}