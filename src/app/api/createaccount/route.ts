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
            return NextResponse.json({ message: "User Already Exists" })
        } else {
            user = new User({ firstName: body.firstName, lastName: body.lastName, email: body.email, password: body.password });
            const savedUser = await user.save();
            console.log('User created:', savedUser);
        }
        return NextResponse.json({ message: "User Created" })
    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}