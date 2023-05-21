"use client"
import React from 'react'
import Link from 'next/link';
const backgroundStyle = "flex flex-col justify-center items-center w-full h-screen rounded-lg bg-gradient-radial"

const App = () => {
    return (
        <div className={backgroundStyle}>
            <h1>Web Hompeage Goes Here</h1>
            <Link href="/login">Login</Link>
            <Link href="/createaccount">Create Account</Link>
        </div>
    )
}
export default App