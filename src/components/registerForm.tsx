import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ISignUp, signUpSchema } from "../server/common/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

function RegisterForm() {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ISignUp>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const { mutateAsync } = trpc.register.signup.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        // console.log("data", data);
        const res = await mutateAsync(data);
        if (res.status == 201) {
          console.log("res", res);
          reset();
          router.push("/");
        }
      } catch (error) {
        console.log("err", error);
      }
    },
    [mutateAsync, router, reset]
  );
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="m-auto w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="sam@email.com"
                  {...field}
                />
              )}
            />
            <p className="text-xs italic text-gray-600">
              Email for account creation
            </p>
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-first-name"
            >
              Username
            </label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                  id="grid-first-name"
                  type="text"
                  placeholder="JaneA@1"
                  {...field}
                />
              )}
            />
            {/* <p className="text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-password"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  {...field}
                />
              )}
            />
            <p className="text-xs italic text-gray-600">
              Make it as long and as crazy as you&apos;d like
            </p>
          </div>
        </div>

        <button
          className="rounded-md border border-black px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
