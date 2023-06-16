import * as jose from 'jose'
import throwError from "../throwerror"
export const getJwtSecret: any = () => {
    const secret = new TextEncoder().encode(process.env.JWTSECRET)
    if (!secret) {
        throwError("Had trouble getting jwt secret")
    }
    return secret;
}
export const verifyAuth = async (token: string) => {
    try {
        const verified = await jose.jwtVerify(token, getJwtSecret())
        console.log(verified, "This has been verified")
        return verified.payload
    }
    catch (err) {
        console.log("Your Token Has Expired")
        throwError("Your Token Has Expired")
    }
}

export const signJwt = async (_id?: string, email?: string, rememberPassword?: boolean) => {
    try {
        return await new jose.SignJWT({ _id, email, rememberPassword })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(rememberPassword ? '2h' : '1h')
            .sign(getJwtSecret());

    } catch (error) {
        console.log(error)
    }
}