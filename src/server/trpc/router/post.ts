import { TRPCError } from '@trpc/server';
import { postSchema, singlePostSchema } from '../../common/authSchema';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const postRouter = router({
    createPost: protectedProcedure.input(postSchema).mutation(async ({ ctx, input }) => {
        const { title, body, userId, category } = input

        const user = await ctx.prisma?.user.findFirst({ where: { id: userId } })
        // //console.log('user', user)
        if (!user) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found'
            })
        }

        const result = await ctx.prisma?.post.create({
            data: {
                title, body, userId,
                categories: {
                    create: category.map((item) => ({
                        category: {
                            connectOrCreate: {
                                where: {
                                    name: item
                                }, create: { name: item }
                            }
                        }
                    }))
                }
            }
        })

        return {
            status: 201,
            message: `Post created with ${result}`
        }
    }),
    getPost: publicProcedure.query(async ({ ctx }) => {
        const result = await ctx.prisma?.post.findMany({
            skip: 0, //* will be returned as numbers from frontend?
            take: 5,
            include: {
                categories: {
                    select: {
                        categoryName: true
                    }
                },
                user: {
                    select: {
                        name: true,
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }, orderBy: { createdAt: 'desc' }
        })

        return result
    }),
    getSinglePost: publicProcedure.input(singlePostSchema).query(async ({ ctx, input }) => {
        const { id } = input
        try {
            const result = await ctx.prisma?.post.findFirst({
                where: {
                    id: id
                },
                include: {
                    categories: {
                        select: {
                            categoryName: true
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    comments: {
                        include: {
                            user: {
                                select: {
                                    id: true, email: true, name: true
                                }
                            },
                        }
                    },
                    commentThread: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            })
            if (!result) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: "Post not found"
                })
            }
            return result
        } catch (error) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "Invalid Id",
            })
        }
    })
})
