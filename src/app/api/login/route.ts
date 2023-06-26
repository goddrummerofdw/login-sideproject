'use server';
import throwError from "@/app/throwerror"
import { NextRequest, NextResponse } from "next/server"
import User from '../../mongooseschema'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshtoken } from '@/app/lib/tokenlogic'
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
                    const token = await createAccessToken(converstIdToString, email) as string
                    response.cookies.set({
                        name: 'user-token',
                        value: token,
                        httpOnly: true,
                        maxAge: 60 * 1,
                    });
                })(),
                    (async () => {
                        const token = await createRefreshtoken(converstIdToString, email, rememberPassword) as string
                        response.cookies.set({
                            name: 'refresh-token',
                            value: token,
                            httpOnly: true,
                            maxAge: 60 * 60 * 2,
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