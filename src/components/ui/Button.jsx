import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses =
    'font-inter font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';

  const variants = {
    primary: 'bg-button-4 text-button-1 hover:opacity-90 disabled:bg-gray-400',
    secondary: 'bg-global-3 text-global-9 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
    google: 'bg-global-3 text-global-9 border border-gray-200 hover:bg-gray-50 shadow-sm',

    // 👇 Custom theo thiết kế
    login: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50',
    register: 'bg-[#F24B88] text-white hover:bg-[#e8437c]'
  };

  const sizes = {
    small: 'px-4 py-[5px] text-sm h-[32px] min-w-[80px]',
    medium: 'px-4 py-2 text-base h-10',
    large: 'px-6 py-3 text-lg h-[54px]'
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
