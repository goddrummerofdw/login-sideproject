import throwError from "@/app/throwerror"
import { NextResponse } from "next/server"
import User from '../../mongooseschema'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        const userObject: { [key: string]: any } | null = await User.findOne({ email: email })
        if (userObject) {
            console.log(`Found User ${userObject}`)
            const match = await bcrypt.compare(password, userObject.password);
            if (match) {
                return NextResponse.json({ status: 200, message: "Dashboard Access Granted" })
            } else {
                return NextResponse.json({ status: 401, message: "Invalid Credentials" })
            }

        } else {
            return NextResponse.json({ status: 401, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}