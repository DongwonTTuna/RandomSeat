import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  onDoubleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  onDoubleClick,
  type = 'button',
  variant = 'primary',
}) => {
  const combinedClassName = `${styles.button} ${styles[variant]} ${className || ''}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button;
