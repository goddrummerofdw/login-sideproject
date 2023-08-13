'use server';
import { NextRequest, NextResponse } from "next/server"
import User from '../../mongooseschema'
import { verifyToken } from '../../lib/tokenlogic'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {


    const hasAccessToken = req.cookies.has("user-token")
    const accessToken = cookies().get('user-token')?.value as string;
    const verifiedAccessToken = hasAccessToken ? await verifyToken(accessToken).catch((error) => console.log("failed verifying refresh token ", error)) : false;
    try {
        if (verifiedAccessToken) {
            const userId = verifiedAccessToken._id
            const user: any = await User.findOne({ _id: userId })
            const { firstName, lastName } = user
            return NextResponse.json({ firstName, lastName });
        } else {
            return NextResponse.json({ message: "No user found with this token" });
        }
    }
    catch (error) {
        console.log(error)
    }
}