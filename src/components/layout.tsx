import { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
