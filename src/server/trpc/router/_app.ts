// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { registerUserRouter } from './register';
import { forgotPasswordRouter } from './forgotpassword';
import { postRouter } from './post';
import { commentRouter } from './comment';
// import { nextHandler } from 'trpc-playground/handlers/next'

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  register: registerUserRouter,
  forgotpassword: forgotPasswordRouter,
  post: postRouter,
  comment: commentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
