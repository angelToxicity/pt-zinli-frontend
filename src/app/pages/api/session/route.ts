import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = cookies()
    cookieStore.delete('id')

    return Response.json("ok", {
        status: 200
    })
}