import { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Navbar />
      <main className="flex grow items-stretch">{children}</main>
      <Footer />
    </div>
  );
}
