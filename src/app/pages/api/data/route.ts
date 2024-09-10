
import type { NextApiRequest, NextApiResponse } from 'next'
const api_url = process.env.NEXT_PUBLIC_API_URL;
import { cookies } from 'next/headers'
import { Crypto } from "@/app/services/crypto";

const crypto = new Crypto()

export async function POST(req:Request) {
    const { data, method, route } = await req.json();
    let res = await fetch(api_url+route,{
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({data: data})
    })
    
    const response = await res.json()
    
    let info_user = response.data ? response.data : response
    if(response.data){
        info_user = JSON.parse(crypto.decryptData(response.data))
        const cookieStore = cookies()
        cookieStore.set('id', info_user._id, {secure: true})
    }

    return Response.json(info_user, {
        status: res.status
    })
}

export async function GET(req:Request) {
    const posts  = req.headers;
    console.log(posts)
    // let res = await fetch(api_url!+posts!,{
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Methods': 'POST',
    //       'Access-Control-Allow-Headers': 'Content-Type'
    //     }
    // })
    
    // const response = await res.json()
    
    // let info_user = response.data ? response.data : response
    // if(response.data){
    //     info_user = JSON.parse(crypto.decryptData(response.data))
    //     const cookieStore = cookies()
    //     cookieStore.set('id', info_user._id, {secure: true})
    // }

    // return Response.json(info_user, {
    //     status: res.status
    // })
    return Response.json("ok", {
        status: 200
    })
}