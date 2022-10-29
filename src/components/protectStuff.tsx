import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import React from "react";

const ProtectStuff: React.FC = () => {
  const { data: session } = useSession();

  const stringifiedData = JSON.stringify(session, null, 2);
  return (
    <>
      this is a protected page
      <p>showing all data {stringifiedData},</p>
      {session && (
        <p className="text-2xl text-blue-500">
          Logged in as {session?.user?.name}
        </p>
      )}
    </>
  );
};

export default ProtectStuff;
