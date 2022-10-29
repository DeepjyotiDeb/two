import { google } from 'googleapis';
import { env } from '../../../env/server.mjs';
import { publicProcedure, router } from '../trpc';
import nodemailer from 'nodemailer'
import { forgotPasswordSchema } from '../../common/authSchema';

export const forgotPasswordRouter = router({
    forgotpassword: publicProcedure.input(forgotPasswordSchema).mutation(async ({ input, ctx }) => {

        const oauth2client = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.REDIRECT_URI)
        oauth2client.setCredentials({ refresh_token: env.REFRESH_TOKEN })
        const accessToken = await oauth2client.getAccessToken()
        console.log('accesss token', accessToken)
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
                        // tls: {
                        //     rejectUnauthorized: false
                        // }
                    }
                })

                const mailOptions = {
                    from: 'Gourav <gouravdeb@gmail.com>',
                    to: 'deepjyoti.deb@playpowerlabs.com',
                    subject: 'hello from gourav',
                    text: 'this is the text 😅',
                    html: '<h1>Hi, bro</h1>'
                }
                console.log('sending mail', accessToken)
                const result = await transport.sendMail(mailOptions)
                return result
            } catch (error) {
                return error
            }
        }

        console.log('ctx and inp', input)
        sendmail().then(result => console.log('mail result', result))
            .catch(err => console.log((err)))

        return {
            status: 201,
            message: 'mail sent',
            input
        }

    })
})