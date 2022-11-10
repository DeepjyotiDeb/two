import { google } from 'googleapis';
import { env } from '../../../env/server.mjs';
import { publicProcedure, router } from '../trpc';
import nodemailer from 'nodemailer'
import { forgotPasswordSchema, resetPassword, tokenSchema } from '../../common/authSchema';
import { TRPCError } from '@trpc/server';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const forgotPasswordRouter = router({
    forgotpassword: publicProcedure.input(forgotPasswordSchema).mutation(async ({ input }) => {

        const oauth2client = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.REDIRECT_URI)
        oauth2client.setCredentials({ refresh_token: env.REFRESH_TOKEN })
        const accessToken = await oauth2client.getAccessToken()
        console.log('input field', input.email)

        const { email } = input;
        const user = await prisma?.user.findFirst({ where: { email } })
        if (!user) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: "Email not found"
            })
        }
        const secret = env.NEXTAUTH_SECRET
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = jwt.sign(payload, secret, { expiresIn: '6hr' })

        const sendmail = async () => {
            try {
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'gouravdeb@gmail.com',
                        clientId: env.GOOGLE_CLIENT_ID,
                        clientSecret: env.GOOGLE_CLIENT_SECRET,
                        accessToken: accessToken.token as string,
                    }
                })

                const mailOptions = {
                    from: 'Gourav <gouravdeb@gmail.com>',
                    to: 'deepjyoti.deb@playpowerlabs.com',
                    subject: 'hello from gourav',
                    text: 'this is the text 😅',
                    html: `<h1>Hi, bro</h1> <a href=http://localhost:3000/reset-password/${token}>reset link</a>`
                }
                const result = await transport.sendMail(mailOptions)
                return result
            } catch (error) {
                return error
            }
        }

        console.log('ctx and inp', input)
        sendmail().then(() => console.log('mail result'))
            .catch(err => console.log((err)))

        return {
            status: 201,
            message: 'mail sent',
            input
        }

    }),
    resetpassword: publicProcedure.input(tokenSchema).query(async ({ input }) => {
        const { token } = input as jwt.JwtPayload
        if (token === undefined) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Invalid input received'
            })
        }
        const isExist = jwt.verify(token, env.NEXTAUTH_SECRET);
        if (isExist === undefined) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Invalid input received'
            })
        }
        return {
            code: '201',
            message: `valid token ${token}`
        }
    }),
    newpassword: publicProcedure
        .input(resetPassword)
        .mutation(async ({ input }) => {
            const { newpass, token } = input
            const tokenValue = jwt.verify(token, env.NEXTAUTH_SECRET) as jwt.JwtPayload
            // const {id} = tokenValue
            console.log('token value', tokenValue)
            const saltRounds = 10;
            const changedPass = await bcrypt.hash(newpass, saltRounds)
            const result = await prisma?.user.update({
                where: {
                    id: tokenValue.id
                },
                data: {
                    password: changedPass
                }
            })

            return {
                status: 201,
                message: `Password was changed from ${result?.email}`
            }
        })
})