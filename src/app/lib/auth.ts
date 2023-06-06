import * as jose from 'jose'
import throwError from "../throwerror"
import { nanoid } from 'nanoid'

interface UserJwtPayload {
    jti: string;
    iat: number;
}

export const getJwtSecret = () => {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
    if (!secret) {
        throwError("ENV secret is not set")
    }
    return secret
}
export const verifyAuth = async (token: string) => {
    try {
        const verified = await jose.jwtVerify(token, getJwtSecret())
        return verified.payload as UserJwtPayload
    }
    catch (err) {
        throwError("Your Token Has Expired")
    }
}

export const signJwt = async () => {
    try {
        return await new jose.SignJWT({})
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime('1m')
            .sign(getJwtSecret())
    } catch (error) {
        throwError("Failed to sign token")
    }
}



