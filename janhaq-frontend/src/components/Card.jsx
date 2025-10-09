import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
