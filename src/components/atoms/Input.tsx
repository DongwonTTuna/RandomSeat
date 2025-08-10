import React, { forwardRef, ChangeEvent } from 'react';

interface InputProps {
  type: string;
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, defaultValue, placeholder, className, onChange }, ref) => {
    return (
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={ref}
        className={`input ${className || ''}`}
        onChange={onChange}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
