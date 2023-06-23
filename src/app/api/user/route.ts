'use server';
import { NextRequest, NextResponse } from "next/server"
import User from '../../mongooseschema'
import { verifyAuth } from '../../lib/auth'

export async function GET(request: NextRequest) {
    try {
        const token: string | undefined = request.cookies.get('user-token')?.value
        const verifiedToken = token && await verifyAuth(token).catch((err) => console.log(err))
        
        if (verifiedToken) {
            let userId = verifiedToken._id
            let user: any = await User.findOne({ _id: userId })
            const { firstName, lastName } = user
            const response = NextResponse.json({ firstName, lastName })
            return response;
        } else {
            return;
        }
    }
    catch (error) {
        console.log(error)
    }
}