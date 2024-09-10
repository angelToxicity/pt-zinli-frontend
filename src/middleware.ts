import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}

export function middleware(request:NextRequest) {
    const pathname = request.url.split(request.headers.get('origin')!)[1]
    const session = request.cookies.get('id');
    if (!session && (pathname != "/pages/api/data")) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    const requestHeaders = new Headers(request.headers)
    Object.entries(corsOptions).forEach(([key, value]) => {
        requestHeaders.set(key, value)
    })
    
    return NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders
        }
    })
}

export const config = {
    matcher: ['/pages/:path*'],
};