// src/pages/_app.tsx
import "../styles/globals.css";
import "../styles/posts.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Layout from "../components/layout";
import {Analytics} from "@vercel/analytics/react"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout title="Supacode!">
        <Component {...pageProps} />
      </Layout>
      <Analytics/>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
