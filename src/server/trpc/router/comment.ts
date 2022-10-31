import { TRPCError } from '@trpc/server';
import { commentSchema, commentThreadSchema } from '../../common/authSchema';
import { protectedProcedure, router } from '../trpc';

export const commentRouter = router({
    postComment: protectedProcedure.input(commentSchema).mutation(async ({ input }) => {
        const { comment, userId, postId } = input
        const isUser = await prisma?.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!isUser) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found'
            })
        }
        const result = await prisma?.comment.create({
            data: {
                userId: userId,
                body: comment,
                postId: postId
            }
        })
        return result
    }),
    threadComment: protectedProcedure.input(commentThreadSchema).mutation(async ({ input }) => {
        const { comment, parentCommentId, userId, postId } = input
        const isUser = await prisma?.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!isUser) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found'
            })
        }

        const result = await prisma?.commentThread.create({
            data: {
                body: comment,
                parentCommentId: parentCommentId,
                postId: postId,
                userId: userId,
            }
        })

        return result
    })
})