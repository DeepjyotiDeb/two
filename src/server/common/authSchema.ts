import * as z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
    username: z.string(),
})
export const forgotPasswordSchema = z.object({
    email: z.string()
})
export const tokenSchema = z.object({
    token: z.string()
})
export const resetPassword = tokenSchema.extend({
    newpass: z.string(),
})

export const postSchema = z.object({
    userId: z.string(),
    category: z.string().array(),
    title: z.string(),
    body: z.string()
})

export const singlePostSchema = z.object({
    id: z.string()
})

export const commentSchema = z.object({
    userId: z.string(),
    comment: z.string(),
    postId: z.string()
})

export const commentThreadSchema = z.object({
    userId: z.string(),
    comment: z.string(),
    parentCommentId: z.string(),
    postId: z.string()
})

export const getUserSchema = z.object({
    userId: z.string(),
})
export const searchFieldSchema = z.object({ searchTerm: z.string() })

export type ISearchField = z.infer<typeof searchFieldSchema>
export type IGetUser = z.infer<typeof getUserSchema>
export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>
export type IForgot = z.infer<typeof forgotPasswordSchema>;
export type IPost = z.infer<typeof postSchema>;