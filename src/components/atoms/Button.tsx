import React from 'react';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  onDoubleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, onDoubleClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`btn ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
