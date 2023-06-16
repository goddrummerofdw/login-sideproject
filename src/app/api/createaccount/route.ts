import throwError from "@/app/throwerror"
import { NextResponse } from "next/server"
import User from '../../mongooseschema'
import bcrypt from 'bcrypt';
import { signJwt } from '../../lib/auth'

export async function POST(request: Request) {
    try {
        const { email, firstName, lastName, password, rememberPassword } = await request.json()
        let fields = [firstName, lastName, email]
        const mapedFields = fields.map((field) => {
            return field.toLowerCase().split(' ').map((char: string) => char.trim()).join('');
        })

        const hashPassword = (password: string, saltRounds: number) => {
            return new Promise((resolve, reject) => {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.error('Error hashing password:', err);
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        }
        let user = await User.findOne({ email: mapedFields[2] })
        const hashedPassword = await hashPassword(password, 10)
        if (user) {
            // console.log(`Found User ${user}`)
            return NextResponse.json({ status: 404, message: "User Already Exists , Please Try Logging in" });


        } else {
            user = new User({ firstName: mapedFields[0], lastName: mapedFields[1], email: mapedFields[2], password: hashedPassword });
            const savedUser = await user.save();
            const response = NextResponse.json({ status: 200, message: "User Created!" });

            (async () => {
                const token = await signJwt(email, rememberPassword) as string
                response.cookies.set({
                    name: 'user-token',
                    value: token,
                    httpOnly: true,
                    maxAge: 60 * 8,
                });
            })();
            console.log('User created:', savedUser);
            return response;
        }

    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}