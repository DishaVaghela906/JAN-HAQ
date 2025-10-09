import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`relative inline-flex items-center justify-center font-semibold rounded-2xl px-6 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:text-white hover:from-blue-700 hover:to-teal-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
