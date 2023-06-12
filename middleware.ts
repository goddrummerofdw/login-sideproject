import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/auth';

export async function middleware(req: NextRequest) {
    // console.log("middleware being triggered", req.nextUrl.pathname)
    const token = req.cookies.get('user-token')?.value
    const verifiedToken = token && await verifyAuth(token).catch((err) => console.log(err))
    if (req.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
        return;
    }
    if (req.nextUrl.pathname.startsWith('/login') && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (!verifiedToken) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (req.nextUrl.pathname.startsWith('/createaccount') && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

}
export const config = {
    matcher: ['/dashboard', '/login']
}; 