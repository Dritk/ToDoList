import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import getValidationSchema from "../components/validation/formValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormProps {
  formType: "signUp" | "signIn";
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const Form: React.FC<FormProps> = ({ formType, onSubmit }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = getValidationSchema(formType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const googleAuthSuccess = (credentialResponse: any) => {
    console.log("Google Auth Success:", credentialResponse);
    navigate("/TodoApp");
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full max-w-md mx-auto"
    >
      <h1 className="text-3xl text-center font-bold mb-4">
        {formType === "signUp" ? "Sign Up Now" : "Welcome back!"}
      </h1>

      {formType === "signUp" && (
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="border border-gray-300 rounded-md w-full px-3 py-2"
            autoComplete="off"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="border border-gray-300 rounded-md w-full px-3 py-2"
          autoComplete="off"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-6 relative">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password")}
          className="border border-gray-300 rounded-md w-full px-3 py-2 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      {formType === "signUp" && (
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="terms"
            {...register("termsAccepted")}
            className="accent-orange-400"
          />
          <label htmlFor="terms" className="ml-2 text-gray-700">
            I agree to the terms & conditions
          </label>
        </div>
      )}
      {errors.termsAccepted && (
        <p className="text-red-500">{errors.termsAccepted.message}</p>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white rounded-lg"
      >
        {formType === "signUp" ? "Sign Up" : "Log In"}
      </button>

      <div className="mb-4 mt-4">
        <p className="text-center text-gray-500">Or</p>
      </div>

      <div>
        <GoogleLogin
          onSuccess={googleAuthSuccess}
          onError={() => console.log("Google Auth Failed")}
        />
      </div>

      <p className="text-center mt-4">
        {formType === "signUp" ? (
          <>
            Have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-500"
            >
              Log In
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500"
            >
              Sign Up
            </button>
          </>
        )}
      </p>
    </form>
  );
};

export default Form;
