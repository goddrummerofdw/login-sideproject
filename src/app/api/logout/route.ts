'use server';
import { NextResponse } from "next/server"

export async function POST() {
    try {
        const response = NextResponse.json({ message: "logout successful" })
        response.cookies.delete('user-token')
        return response;
    }
    catch (error) {
        console.log(error)
    }
}