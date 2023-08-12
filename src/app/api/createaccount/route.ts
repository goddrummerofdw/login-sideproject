import throwError from "@/app/throwerror"
import { NextResponse } from "next/server"
import User from '../../mongooseschema'
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';
import { createAccessToken, createRefreshtoken } from '@/app/lib/tokenlogic'

export async function POST(request: Request) {
    try {
        //createdAt field timezone 
        const targetTimeZone = 'America/New_York';
        const createdAt = moment().tz(targetTimeZone).format('YYYY-MM-DD HH:mm:ss');
        //user's input data
        const { firstName, lastName, email, password } = await request.json()
        let fields = [firstName, lastName, email]
        const mapedFields = fields.map((field) => {
            return field.toLowerCase().split(' ').map((char: string) => char.trim()).join('');
        })
        //hashes password
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
        //looks for the user in the database by email
        let user = await User.findOne({ email: mapedFields[2] })
        const hashedPassword = await hashPassword(password, 10)
        if (user) {
            // console.log(`Found User ${user}`)
            return NextResponse.json({ status: 404, message: "User Already Exists , Please Try Logging in" });

        } else {
            user = new User({ firstName: mapedFields[0], lastName: mapedFields[1], email: mapedFields[2], password: hashedPassword, createdAt: createdAt });
            const savedUser = await user.save();
            const response = NextResponse.json({ status: 200, message: "User Created!" });
            // creates and sets the accesstoken on the user's browser
            (async () => {
                const _id = savedUser._id.toString()
                const token = await createAccessToken(_id, email) as string
                response.cookies.set({
                    name: 'user-token',
                    value: token,
                    httpOnly: true,
                    maxAge: 120,
                });
            })();
            (async () => {
                const _id = savedUser._id.toString()
                const token = await createRefreshtoken(_id, email) as string
                response.cookies.set({
                    name: 'refresh-token',
                    value: token,
                    httpOnly: true,
                    maxAge: 120,
                });
            })()
            console.log('User created:', savedUser);
            return response;
        }
        // loggs the errors
    } catch (error) {
        console.log(error)
        throwError('Something Went Wrong')
    }
}