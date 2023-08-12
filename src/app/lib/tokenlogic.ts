
import * as jose from 'jose'
import { nanoid } from 'nanoid'
import throwError from "../throwerror"


export const getJwtSecret = () => {
    const secret = new TextEncoder().encode(process.env.JWTSECRET) as Uint8Array
    if (!secret) {
        throwError("Had trouble getting jwt secret")
    }
    return secret;
}

export const createAccessToken = (_id?: string, email?: string) => {
    const payload: jose.JWTPayload = {
        _id, email
    }
    try {
        return new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1m')
            .sign(getJwtSecret());
    } catch (error) {
        console.log(error)
    }
}

export const createRefreshtoken = (_id: string, email: string, rememberPassword?: boolean) => {
    // const refreshTokenId = nanoid()
    const payload: jose.JWTPayload = {
        _id, email, rememberPassword
    }
    try {
        return new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(rememberPassword ? '2h' : '1h')
            .sign(getJwtSecret());

    } catch (error) {
        console.log(error)
    }
}

export const verifyToken = async (token: string | Uint8Array) => {
    try {
        const verified = await jose.jwtVerify(token, getJwtSecret())
        return verified.payload
    }
    catch (err) {
        console.log(err)
    }
}