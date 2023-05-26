import throwError from "@/app/throwerror"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import User from '../../mongooseschema'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        console.log(NextRequest)
        let user = await User.findOne({ email: email, password: password })
        if (user) {
            console.log(`Found User ${user}`)
            return NextResponse.json({ status: 200, message: "Dashboard Access Granted" })
        } else {
            return NextResponse.json({ status: 401, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}