import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormProps {
  formType: "signUp" | "signIn";
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const Form: React.FC<FormProps> = ({ formType, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: "",
  });

  const validateForm = () => {
    let formValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      termsAccepted: "",
    };

    if (formType === "signUp" && !formData.name.trim()) {
      newErrors.name = "Name is required.";
      formValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      formValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      formValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      formValid = false;
    }

    if (formType === "signUp" && !formData.termsAccepted) {
      newErrors.termsAccepted = "You must agree to the terms & conditions.";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <h1 className="text-3xl text-center font-bold mb-4">
        {formType === "signUp" ? "Get Started Now" : "Sign In"}
      </h1>

      {formType === "signUp" && (
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-lg mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-lg mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {formType === "signUp" && (
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="terms"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className="accent-orange-400"
          />
          <label htmlFor="terms" className="ml-2">
            I agree to the terms & policy
          </label>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white rounded-lg"
      >
        {formType === "signUp" ? "Sign Up" : "Sign In"}
      </button>

      <div className="flex flex-row space-x-4 m-2">
        <button className="w-full py-3 rounded-lg border border-black flex items-center justify-center space-x-2">
          <img src="./google.png" alt="Google logo" className="h-5" />
          <span>Sign in with Google</span>
        </button>

        <button className="w-full py-3 rounded-lg border border-black flex items-center justify-center space-x-2">
          <img src="./apple.png" alt="Apple logo" className="h-5" />
          <span>Sign in with Apple</span>
        </button>
      </div>

      <p className="text-center mt-4">
        {formType === "signUp" ? (
          <>
            Have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-500"
            >
              Sign In
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
