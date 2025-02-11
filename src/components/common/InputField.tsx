import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  register: any;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  register,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className="border border-gray-300 rounded-md w-full px-3 py-2 pr-10"
        autoComplete="off"
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
