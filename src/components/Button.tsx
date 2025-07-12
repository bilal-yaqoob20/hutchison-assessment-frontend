import React from "react";
import { LoaderCircle, type LucideIcon } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "danger" | "default";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  variant = "default",
  className = "",
  disabled,
  loading,
  type = "button",
}) => {
  const baseStyles =
    "flex items-center gap-1 font-medium px-4 py-2 rounded-lg transition cursor-pointer whitespace-nowrap";

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    default: "border border-gray-300 bg-white text-black hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        (loading || disabled) && "opacity-60 pointer-events-none",
        className
      )}
    >
      {loading ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        Icon && <Icon size={18} />
      )}
      {label}
    </button>
  );
};

export default Button;
