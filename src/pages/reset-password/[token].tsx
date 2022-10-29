import { NextPage } from "next";
// import dynamic from "next/dynamic";
import React from "react";
import ResetPassword from "../../components/resetPassword";

// const ResetPassword = dynamic(() => import("../../components/resetPassword"), {
//   ssr: false,
// });

const ResetForm: NextPage = () => {
  return <ResetPassword />;
};

export default ResetForm;
