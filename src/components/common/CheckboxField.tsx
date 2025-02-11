import React from "react";

interface CheckboxFieldProps {
  id: string;
  label: string;
  register: any;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  register,
  error,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        {...register(id)}
        className="accent-orange-400"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {label}
      </label>
      {error && <p className="text-red-500 ml-2">{error}</p>}
    </div>
  );
};

export default CheckboxField;
