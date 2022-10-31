import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const ResetPassword = () => {
  // const token = useRouter().query.token as string;
  const router = useRouter();
  const { token } = router.query;
  const { data } = trpc.forgotpassword.resetpassword.useQuery(
    { token: token as string },
    {
      retry: false,
      enabled: router.isReady,
      onSuccess: async (success) => {
        console.log("success", data, success);
      },
      onError: async (error) => {
        console.log("err", error);
        router.push("/");
      },
    }
  );
  const [newPass, setNewPass] = useState("");
  const { mutateAsync } = trpc.forgotpassword.newpassword.useMutation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await mutateAsync({
        newpass: newPass,
        token: token as string,
      });
      console.log("res", res);
      if (res.status === 201) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      router.replace("/");
    }
  };

  return (
    <div>
      <p>reset password</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-pass">new password</label>
        <input
          type="text"
          name="new-pass"
          onChange={(e) => setNewPass(e.target.value)}
        />
        <button type="submit">change password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
