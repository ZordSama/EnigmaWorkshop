import { NextResponse, type NextRequest } from "next/server";


export function middleware(request: NextRequest){
    if (request.nextUrl.pathname.match('/')){
        return NextResponse.redirect(new URL('/home', request.url));
    }
}