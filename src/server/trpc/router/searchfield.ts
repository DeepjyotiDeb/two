import { TRPCError } from '@trpc/server';
import { getUserSchema } from '../../common/authSchema';
import { publicProcedure, router } from '../trpc';

export const searchField = router({
    searchField: publicProcedure.input(getUserSchema).query(async ({ input }) => {
        const { userId } = input
        console.log('userId', userId)
        // const result = await prisma?.post.findRaw({ filter: { $text: { $search: userId } } })
        const result = await prisma?.post.aggregateRaw({
            pipeline: [
                {
                    $search: {
                        autocomplete: {
                            query: userId,
                            path: "title",
                            fuzzy: {
                                maxEdits: 2,
                                prefixLength: 3
                            }
                        }
                    }
                }
            ]
        })
        try {
            const newRes = result.map(item => item._id)
            return newRes
        } catch (error) {
            console.log(error)
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: '0 results found'
            })
        }
    })
})