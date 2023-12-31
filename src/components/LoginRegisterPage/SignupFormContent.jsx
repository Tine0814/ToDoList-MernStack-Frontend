import React, { useState } from "react";
import { motion } from "framer-motion";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup";
import InputComponent from "../form/textField/InputComponent";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignupFormContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await signup(data.email, data.password);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex md:w-[500px] sm:h-[400px] md:h-[500px] flex-col justify-center items-center p-10 gap-5">
          <h1 className="text-[15px] font-bold">Sign Up</h1>
          <div className="w-full">
            <InputComponent
              label="Email"
              name="email"
              error={errors?.email}
              register={register}
            />
          </div>
          <div className="w-full relative">
            <InputComponent
              label="Password"
              name="password"
              type={!showPassword ? "password" : "text"}
              error={errors?.password}
              register={register}
            />
            {!showPassword ? (
              <div
                onClick={() => setShowPassword(true)}
                className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer"
              >
                <RemoveRedEyeIcon />
              </div>
            ) : (
              <div
                onClick={() => setShowPassword(false)}
                className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer"
              >
                <VisibilityOffIcon />
              </div>
            )}
          </div>
          {error && <div>{error}</div>}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-gradient-to-r from-[#eebd89] to-[#d13abd] py-3 px-5 w-full text-white shadow-lg rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupFormContent;
