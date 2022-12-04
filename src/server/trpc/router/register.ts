/* eslint-disable @typescript-eslint/no-unused-vars */
import { TRPCError } from '@trpc/server';
import { ObjectID } from 'bson';
import { randomUUID } from 'crypto';
import { signJwt } from '../../../utils/jwt';
import { signUpSchema } from '../../common/authSchema';
import { publicProcedure, router } from '../trpc';
import * as bcrypt from 'bcrypt'

// const t = initTRPC.context().create()
export const registerUserRouter = router({
    signup: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {

        const { email, username, password } = input;
        const exists = await ctx.prisma?.user.findFirst({
            where: { email }
        })
        if (exists) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "User already exists"
            })
        }
        const randomId = new ObjectID().toString();
        const id_session_token = signJwt({ email, name: username, randomId })

        const saltRounds = 10;
        const newPass = await bcrypt.hash(password, saltRounds)

        const result = await ctx.prisma?.user.create({
            data: {
                id: randomId,
                email,
                name: username,
                password: newPass,
                userType: "LOCAL"
            }
        })
        await ctx.prisma?.account.create({
            data: {
                provider: "credentials", type: "local",
                providerAccountId: randomUUID(),
                userId: randomId,
                id_token: id_session_token
            }
        })
        // console.log('ctx', ctx)
        return {
            status: 201,
            message: `Account for ${result?.email} created successfully`
        }
    })
})