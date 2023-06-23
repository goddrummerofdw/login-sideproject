'use server';
import throwError from "@/app/throwerror"
import { NextRequest, NextResponse } from "next/server"
import User from '../../mongooseschema'
import bcrypt from 'bcrypt'
import { signJwt } from '../../lib/auth'
export async function POST(request: NextRequest) {
    try {
        const { email, password, rememberPassword } = await request.json()
        const userObject: { [key: string]: any } | null = await User.findOne({ email: email })
        if (userObject) {
            const { _id, firstName, lastName, email } = userObject
            const converstIdToString = _id.toString()
            const match = await bcrypt.compare(password, userObject.password);
            if (match) {
                // console.log(`Found User ${userObject}`)
                const response = NextResponse.json({ status: 200, message: "Dashboard Access Granted", user: { 'firstname': firstName, 'lastname': lastName, 'email': email, 'rememberPassword': rememberPassword } });

                (async () => {
                    const token = await signJwt(converstIdToString, email, rememberPassword) as string
                    response.cookies.set({
                        name: 'user-token',
                        value: token,
                        httpOnly: true,
                        maxAge: 60 * 60 * 24,
                    });
                })()
                return response
            } else {
                // console.log(`No User Found ${userObject}`)
                return NextResponse.json({ status: 401, message: "Invalid Credentials", user: null })
            }
        } else {
            return NextResponse.json({ status: 401, message: "Account Not Found", user: null })
        }
    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}