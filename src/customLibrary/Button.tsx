// components/Button.tsx
import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cancel";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    "py-2 px-4 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg hover:shadow-xl",
    cancel:
      "bg-gray-200 text-gray-800 shadow-md hover:bg-gray-300 hover:shadow-lg", // Styles for cancel button
  };

  return (
    <button
      className={classNames(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
};

export default Button;
