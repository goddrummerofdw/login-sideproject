'use server';
import { NextRequest, NextResponse } from "next/server"
import User from '../../mongooseschema'
import { verifyAuth } from '../../lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const token: any = cookies().get('user-token')?.value;
    const verifiedToken = token && await verifyAuth(token).catch((err) => console.log(err))
    try {
        if (verifiedToken) {
            const userId = verifiedToken._id
            const user: any = await User.findOne({ _id: userId })
            const { firstName, lastName } = user
            return NextResponse.json({ firstName, lastName });

        } else {
            const response = NextResponse.json({ message: "No user found with this token" });
            return response;
        }
    }
    catch (error) {
        console.log(error)
    }
}