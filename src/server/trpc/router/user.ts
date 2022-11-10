import { TRPCError } from '@trpc/server'
import { getUserSchema } from '../../common/authSchema'
import { exclude } from '../../common/excludePassword'
import { protectedProcedure, router } from '../trpc'

export const userRouter = router({
    getUser: protectedProcedure.input(getUserSchema).query(async ({ input }) => {
        const { userId } = input
        const isUser = await prisma?.user.findFirst({
            where: {
                id: userId
            },
            include: {
                posts: {
                    select: {
                        _count: true,
                        title: true,
                        categories: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        })

        if (!isUser) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found'
            })
        }
        const userWithoutPassword = exclude(isUser, 'password')
        return userWithoutPassword
    }),
})