import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  onClick,
  className = '',
  disabled = false,
}) => {
  const baseClasses = 'font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl';
  
  const variantClasses = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-purple-700 hover:bg-purple-800 text-white',
    outline: 'bg-white hover:bg-gray-50 text-purple-700 border-2 border-purple-700',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;