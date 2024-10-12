// components/ui/input.tsx
import React, { InputHTMLAttributes } from 'react';

// Example of using InputHTMLAttributes in a component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props here
}

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} />;
};

export default Input;
