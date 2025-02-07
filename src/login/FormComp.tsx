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
    let formIsValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      termsAccepted: "",
    };

    if (formType === "signUp" && !formData.name.trim()) {
      newErrors.name = "Name is required.";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      formIsValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      formIsValid = false;
    }

    if (formType === "signUp" && !formData.termsAccepted) {
      newErrors.termsAccepted = "You must agree to the terms & conditions.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
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
        {formType === "signUp" ? "Sign Up Now" : "Welcome back!"}
      </h1>

      {formType === "signUp" && (
        <div className="mb-4">
          <label htmlFor="name" className="label-text">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-container"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="label-text">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input-container"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="label-text">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="input-container"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
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
            I agree to the terms & conditions
          </label>
          {errors.termsAccepted && (
            <p className="error-text">{errors.termsAccepted}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white rounded-lg"
      >
        {formType === "signUp" ? "Sign Up" : "Log In"}
      </button>

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
