import { NextResponse } from "next/server"

export async function POST() {
    try {
        const response = NextResponse.json({ message: "logout successful" })
        response.cookies.delete('user-token')
        response.cookies.delete('refresh-token')
        return response;
    }
    catch (error) {
        console.log(error)
    }
}