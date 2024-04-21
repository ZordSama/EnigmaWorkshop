import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest){
    if(request.nextUrl.pathname === '/'){
        // console.log('request', request);
        return NextResponse.redirect(new URL('/home', request.url))
    }else{
        // console.log('request', request);
        return NextResponse.next() 
    }
}

export const config = {
    matcher: '/',
}