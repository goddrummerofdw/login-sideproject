'use server';
import { NextRequest, NextResponse } from "next/server"
import User from '../../mongooseschema'
import { verifyAuth } from '../../lib/auth'

export async function GET(request: NextRequest) {
    const response = NextResponse.json({ message: "Something went wrong" });
    try {
        const token: string | undefined = request.cookies.get('user-token')?.value
        const verifiedToken = token && await verifyAuth(token).catch((err) => console.log(err))

        if (verifiedToken) {
            const userId = verifiedToken._id
            const user: any = await User.findOne({ _id: userId })
            const { firstName, lastName } = user

            const response = NextResponse.json({ firstName, lastName })
            return response;
        }
        return response;
    }
    catch (error) {
        console.log(error)
    }
}