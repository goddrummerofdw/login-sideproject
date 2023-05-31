import { NextResponse } from 'next/server';
export function middleware(req: any) {

    console.log("This is a test", req.nextUrl.pathname)
    if (req.nextUrl.pathname.includes("login")) {
        const response = NextResponse.next()
        response.cookies.set("login cookie", '1234')
        return response
    } else {
        // console.log(false)
    }

}