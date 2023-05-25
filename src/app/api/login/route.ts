import throwError from "@/app/throwerror"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import User from '../../mongooseschema'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log(NextRequest)
        let user = await User.findOne({ email: body.email })
        if (user) {
            console.log(`Found User ${user}`)
            return NextResponse.json({ status: 200, message: "User Found, Grant them Dashboard Access" })
        } else {
            return NextResponse.json({ status: 401, message: "User Not Found, Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}