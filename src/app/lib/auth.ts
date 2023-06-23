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
    console.log(token, 'This is verify auth')
    try {
        const verified = await jose.jwtVerify(token, getJwtSecret())
        return verified.payload
    }
    catch (err) {
        console.log(err)
    }
}

export const signJwt = async (_id?: string, email?: string, rememberPassword?: boolean) => {
    console.log(_id, 'This is _id inside signjwt')
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