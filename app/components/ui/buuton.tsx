import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-gradient-to-tr from-green-400 to-blue-500 text-white rounded-2xl shadow hover:scale-105 transform transition className`}
      {...props}
    >
      {children}
    </button>
  );
}
