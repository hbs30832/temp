import { Request } from 'express'
import { JwtFromRequestFunction } from 'passport-jwt'

export const jwtExtractorFromCookies: JwtFromRequestFunction = (request: Request): string | null => {

    try {
        const jwt = request.cookies['jwt'];
        console.log(jwt)
        return jwt;
    } catch (e) {
        return null
    }
}
