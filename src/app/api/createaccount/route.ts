import throwError from "@/app/throwerror"
import { NextResponse } from "next/server"
import User from '../../mongooseschema'

export async function POST(request: Request) {
    try {
        const { email, firstName, lastName, password } = await request.json()
        const lowerCaseEmail = email.toLowerCase()
        let user = await User.findOne({ email: lowerCaseEmail })
        if (user) {
            console.log(`Found User ${user}`)
            return NextResponse.json({ status: 404, message: "User Already Exists , Please Try Logging in" })
        } else {
            user = new User({ firstName: firstName, lastName: lastName, email: lowerCaseEmail, password: password });
            const savedUser = await user.save();
            console.log('User created:', savedUser);
        }
        return NextResponse.json({ status: 200, message: "User Created!" })
    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}