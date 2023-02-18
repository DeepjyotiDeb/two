import Head from "next/head";
import { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactElement;
  title?: string;
  description?: string;
  image?: string;
}

export default function Layout({ children, ...props }: LayoutProps) {
  const { title = "test" } = props;
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Head>
        <title>Supacode {`| ${title}`}</title>
      </Head>
      <Navbar />
      <main className="flex grow items-stretch">{children}</main>
      <Footer />
    </div>
  );
}
