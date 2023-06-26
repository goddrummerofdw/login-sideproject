
import * as jose from 'jose'
import { nanoid } from 'nanoid'
import throwError from "../throwerror"


export const getJwtSecret: any = () => {

    const secret = new TextEncoder().encode(process.env.JWTSECRET)
    if (!secret) {
        throwError("Had trouble getting jwt secret")
    }
    return secret;
}

export const createAccessToken = async (_id?: string, email?: string) => {
    const payload: jose.JWTPayload = {
        _id, email
    }

    try {
        return await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1m')
            .sign(getJwtSecret());

    } catch (error) {
        console.log(error)
    }
}

export const createRefreshtoken = async (_id: string, email: string, rememberPassword?: boolean) => {
    // const refreshTokenId = nanoid()
    const payload: jose.JWTPayload = {
        _id, email, rememberPassword
    }
    try {
        return await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(rememberPassword ? '2h' : '1h')
            .sign(getJwtSecret());

    } catch (error) {
        console.log(error)
    }
}

export const verifyToken = async (token: string) => {
    try {
        const verified = await jose.jwtVerify(token, getJwtSecret())
        return verified.payload
    }
    catch (err) {
        console.log(err)
    }
}