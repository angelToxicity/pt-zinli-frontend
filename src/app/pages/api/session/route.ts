import { cookies } from 'next/headers'

export function GET() {
    const cookieStore = cookies()
    cookieStore.delete('id')

    return Response.json({data: "ok"}, {
        status: 200
    })
}