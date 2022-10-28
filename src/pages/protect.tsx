/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import ProtectStuff from "../components/protectStuff";
import { requireAuth } from "../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (_ctx) => {
  return { props: {} };
});

const Protect: NextPage = () => {
  return <ProtectStuff />;
};

export default Protect;
