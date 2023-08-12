import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, createAccessToken } from '@/app/lib/tokenlogic';

let testedAccessToken: boolean;
export async function middleware(req: NextRequest, res: NextResponse) {

    const response = NextResponse.next()
    //Checks to see if user has any tokens on browser
    const hasAccessToken = req.cookies.has("user-token")
    const hasRefreshToken = req.cookies.has("refresh-token")
    //Gets the token from the browser
    const accessToken = req.cookies.get('user-token')?.value as string
    const refreshToken = req.cookies.get('refresh-token')?.value as string
    // Verifies the tokens on the user's browser
    const verifiedAccessToken = hasAccessToken ? await verifyToken(accessToken).catch((error) => console.log("failed verifying refresh token ", error)) : false;
    const verifiedRefreshToken = hasRefreshToken ? await verifyToken(refreshToken).catch((error) => console.log("failed verifying refresh token ", error)) : false;

    // Changes the testedAccessToken variable which is responsible for redirecting the user to the correct page

    if (!verifiedAccessToken && !verifiedRefreshToken) {
        testedAccessToken = false
    } else if (verifiedAccessToken) {
        testedAccessToken = true
    } else if (!verifiedAccessToken && verifiedRefreshToken) {
        const { _id, email } = verifiedRefreshToken as any
        const newAccessToken = await createAccessToken(_id, email) as string
        response.cookies.set({
            name: 'user-token',
            value: newAccessToken,
            httpOnly: true,
            maxAge: 60,
        });
        return response;
    }
    //Navigates the user to the appropriate page depending on testedAccessToken

    if (req.nextUrl.pathname.startsWith('/login') && !testedAccessToken) {
        return;
    }
    if (req.nextUrl.pathname.startsWith('/login') && testedAccessToken) {

        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (!testedAccessToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/createaccount') && testedAccessToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/login']
}; 