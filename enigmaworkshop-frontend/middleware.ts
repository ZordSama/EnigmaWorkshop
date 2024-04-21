import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    if(request.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/home', request.url)) //redirects to /home if the path is /
    }else{
        return NextResponse.next() //if the path is not /, it will return the next response.
    }
}

export const config = {
    matcher: '/',
}