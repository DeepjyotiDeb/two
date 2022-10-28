/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProviders, signIn } from "next-auth/react";
import { Context } from "../server/trpc/context";

interface Provider {
  name: string;
  id: string;
}

export default function SignIn({ providers }: { providers: Provider }) {
  return (
    <>
      {Object.values(providers).map((provider: Provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, { callbackUrl: "http://localhost:3000" })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(_context: Context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
