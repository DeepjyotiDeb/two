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

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>
export type IForgot = z.infer<typeof forgotPasswordSchema>;