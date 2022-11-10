// src/server/trpc/router/_app.ts
import { publicProcedure, router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { registerUserRouter } from './register';
import { forgotPasswordRouter } from './forgotpassword';
import { postRouter } from './post';
import { commentRouter } from './comment';
import { userRouter } from './user';
import { searchField } from './searchfield';
// import { nextHandler } from 'trpc-playground/handlers/next'

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  register: registerUserRouter,
  forgotpassword: forgotPasswordRouter,
  post: postRouter,
  comment: commentRouter,
  user: userRouter,
  search: searchField,
  healthcheck: publicProcedure.query(() => "yay!"),
});

// export type definition of API
export type AppRouter = typeof appRouter;
