import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/30 border border-transparent hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-secondary-500 hover:bg-secondary-400 text-black shadow-lg shadow-secondary-500/30 border border-transparent hover:-translate-y-0.5 active:translate-y-0",
    outline: "border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:text-white bg-transparent",
    ghost: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/30 border border-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : null}
      <span className="relative z-10 flex items-center">{children}</span>
    </button>
  );
};

export default Button;