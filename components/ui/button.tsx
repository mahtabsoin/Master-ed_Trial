// components/ui/button.js
import React from 'react';

export const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
};