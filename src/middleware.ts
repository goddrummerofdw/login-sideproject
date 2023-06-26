import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, createAccessToken } from '@/app/lib/tokenlogic';
interface JWTPayload {
    _id: string;

}
export async function middleware(req: NextRequest, res: NextResponse) {
    const response = NextResponse.next()
    // console.log("middleware being triggered", req.nextUrl.pathname)
    const accessToken = req.cookies.get('user-token')?.value
    const refreshToken = req.cookies.get('refresh-token')?.value as string

    let verifiedAccessToken: any;
    verifiedAccessToken = accessToken && await verifyToken(accessToken).catch((err) => console.log(err));

    if (accessToken === undefined && refreshToken === undefined) {
        verifiedAccessToken === undefined
    } else if (accessToken === undefined) {
        await verifyToken(refreshToken)
        const tokenContent = await verifyToken(refreshToken)
        const { _id, email } = tokenContent as any
        verifiedAccessToken = await createAccessToken(_id, email)
        response.cookies.set({
            name: 'user-token',
            value: verifiedAccessToken,
            httpOnly: true,
            maxAge: 60 * 1,
        });
    }


    if (req.nextUrl.pathname.startsWith('/login') && !verifiedAccessToken) {
        // console.log('You dont have a token')
        return;
    }
    if (req.nextUrl.pathname.startsWith('/login') && verifiedAccessToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (!verifiedAccessToken) {
        // console.log('No token')
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/createaccount') && verifiedAccessToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return response;
}

export const config = {
    matcher: ['/dashboard', '/login']
}; 