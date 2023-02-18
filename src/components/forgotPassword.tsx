import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const ForgotPassword: React.FC = () => {
  const [field, setField] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const { mutateAsync } = trpc.forgotpassword.forgotpassword.useMutation({
    onSuccess: (success) => {
      setMessageSent(true);
      // //console.log("success", success);
    },
  });

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setField(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await mutateAsync({ email: field });
      // //console.log("res data sent", res);
    } catch (error) {
      // //console.log("err", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">send mail</button>
      </form>
      {messageSent && <p>message was sent</p>}
    </div>
  );
};

export default ForgotPassword;
