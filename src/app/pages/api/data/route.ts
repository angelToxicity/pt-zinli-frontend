
const api_url = process.env.NEXT_PUBLIC_API_URL;
import { cookies } from 'next/headers'
import { Crypto } from "@/app/services/crypto";
import { NextRequest } from 'next/server';

const crypto = new Crypto()

export async function POST(req:Request) {
    const cookieStore = cookies()
    const { data, method, route } = await req.json();
    const res = await fetch(api_url+route,{
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({data: data})
    })
    
    const response = await res.json()
    
    let info_user = response.data ? response.data : response
    if(response.data && !cookieStore.get('id')?.value){
        info_user = JSON.parse(crypto.decryptData(response.data))
        cookieStore.set('id', info_user._id, {secure: true})
    }

    return Response.json({data: info_user}, {
        status: res.status
    })
}

export async function PATCH(req:Request) {
    const body = await req.json()
    const { data, route, method } = JSON.parse(crypto.decryptData(body.data));
    
    const res = await fetch(api_url+route,{
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PATCH',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({data: data})
    })
    
    const response = await res.json()
    
    let info_user = response.data ? response.data : response
    if(response.data){
        info_user = JSON.parse(crypto.decryptData(response.data))
    }

    return Response.json({data: info_user}, {
        status: res.status
    })
}

export async function GET(req:NextRequest) {
    
    const url = new URL(req.url)
    const posts = url.searchParams.get("posts")
    
    const res = await fetch(api_url!+posts!,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
    })
    
    const response = await res.json()
    
    let info_user = response.data ? response.data : response
    if(response.data){
        info_user = JSON.parse(crypto.decryptData(response.data))
        const cookieStore = cookies()
        cookieStore.set('id', info_user._id, {secure: true})
    }

    return Response.json({data: info_user}, {
        status: res.status
    })
}