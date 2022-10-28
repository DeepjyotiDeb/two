import { useSession } from "next-auth/react";
import React from "react";

const ProtectStuff: React.FC = () => {
  const { data: sessionData } = useSession();
  const stringifiedData = JSON.stringify(sessionData, null, 2);

  return (
    <>
      this is a protected page
      <p>showing all data {stringifiedData},</p>
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
    </>
  );
};

export default ProtectStuff;
