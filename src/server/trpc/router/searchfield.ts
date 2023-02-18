
import { TRPCError } from '@trpc/server';
import { searchFieldSchema } from '../../common/authSchema';
import { publicProcedure, router } from '../trpc';

export const searchField = router({
    searchField: publicProcedure.input(searchFieldSchema).query(async ({ ctx, input }) => {
        const { searchTerm } = input
        console.log('userId', searchTerm)
        // const result = await prisma?.post.findRaw({ filter: { $text: { $search: searchTerm } } })
        const result = await ctx.prisma?.post.aggregateRaw({
            pipeline: [
                {
                    $search: {
                        autocomplete: {
                            query: searchTerm,
                            path: "title",
                            fuzzy: {
                                maxEdits: 2,
                                prefixLength: 3
                            }
                        }
                    }
                }, { $limit: 10 },
                // { $project: { _id: 1, title: 1 } }
            ]
        })
        try {
            const newRes = result?.map((item: any) => {
                return item
            })
            console.log({ newRes, result })
            return result
        } catch (error) {
            console.log(error)
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: '0 results found'
            })
        }
    })
})