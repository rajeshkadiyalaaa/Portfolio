import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    default: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white'
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-6 text-lg'
  };
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;