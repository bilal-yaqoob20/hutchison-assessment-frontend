import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  message?: string;
  error?: boolean;
  required?: boolean;
  name?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  message,
  error = false,
  required = false,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
        required={required}
      />
      {message && (
        <span
          className={`text-xs ${error ? "text-red-500" : "text-gray-500"} mt-1`}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export default InputField;
