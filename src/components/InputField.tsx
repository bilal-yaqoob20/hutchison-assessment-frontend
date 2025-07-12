import React from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";

type InputFieldProps = {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  message?: string;
  error?: boolean;
  required?: boolean;
  name?: string;
  startIcon?: LucideIcon;
  clearField?: () => void;
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
  startIcon: StartIcon,
  clearField,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {StartIcon && (
          <span className="absolute left-3 text-gray-400 pointer-events-none">
            {<StartIcon size={18} />}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2",
            StartIcon ? "pl-10" : "pl-4",
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          )}
          required={required}
        />
        {clearField && (
          <span
            onClick={clearField}
            className="absolute right-3 text-gray-400 cursor-pointer"
          >
            {<X size={18} />}
          </span>
        )}
      </div>

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
