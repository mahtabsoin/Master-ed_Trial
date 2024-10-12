// components/ui/radio-group.js
import React from 'react';

export const RadioGroup = ({ children, ...props }) => {
  return (
    <div {...props} className="flex space-x-4">
      {children}
    </div>
  );
};

export const RadioGroupItem = ({ value, id, ...props }) => {
  return (
    <input type="radio" value={value} id={id} {...props} className="hidden" />
  );
};