import * as jwt from 'jsonwebtoken'
import { env } from '../env/server.mjs'


const SECRET = env.NEXTAUTH_SECRET || 'changeme'

export function signJwt(data: object) {
    return jwt.sign(data, SECRET)
}

export function verifyJwt<T>(token: string) {
    return jwt.verify(token, SECRET) as T
}