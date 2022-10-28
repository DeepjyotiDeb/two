import { TRPCError } from '@trpc/server';
import { ObjectID } from 'bson';
import { randomUUID } from 'crypto';
import { guidGenerator } from '../../../utils/customUuid';
import { signJwt } from '../../../utils/jwt';
import { signUpSchema } from '../../common/authSchema';
import { publicProcedure, router } from '../trpc';

// const t = initTRPC.context().create()
export const registerUserRouter = router({
    signup: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {

        const { email, username, password } = input;
        const exists = await prisma?.user.findFirst({
            where: { email }
        })
        if (exists) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "User already exists"
            })
        }
        const randomId = new ObjectID().toString();
        const result = await prisma?.user.create({
            data: {
                email, password, name: username, id: randomId
            }
        })
        const id_session_token = signJwt({ email, name: username })
        await prisma?.account.create({
            data: {
                provider: "credentials", type: "local",
                providerAccountId: randomUUID(),
                userId: randomId,
                id_token: id_session_token
            }
        })
        console.log('ctx', ctx)
        return {
            status: 201,
            message: `Account for ${result?.email} created successfully`
        }
    })
})