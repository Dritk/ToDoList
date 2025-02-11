import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import getValidationSchema from "../components/validation/formValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../components/common/InputField";
import CheckboxField from "../components/common/CheckboxField";

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
          <InputField
            label="Name"
            id="name"
            register={register}
            error={errors.name?.message}
          />
        </div>
      )}

      <div className="mb-4">
        <InputField
          label="Email"
          id="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />
      </div>

      <div className="mb-6 relative">
        <InputField
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          register={register}
          error={errors.password?.message}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500 "
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="mb-4 flex items-center">
        {formType === "signUp" && (
          <CheckboxField
            id="termsAccepted"
            label="I agree to the terms & conditions"
            register={register}
            error={errors.termsAccepted?.message}
          />
        )}
      </div>

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
