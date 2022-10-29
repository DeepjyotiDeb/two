import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

const ForgotPassword: React.FC = () => {
  const { mutateAsync } = trpc.forgotpassword.forgotpassword.useMutation();

  const [field, setField] = useState("");
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setField(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await mutateAsync({ email: field });
      console.log("res data sent", res);
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">send mail</button>
    </form>
  );
};

export default ForgotPassword;
