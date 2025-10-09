// Card.jsx
import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
