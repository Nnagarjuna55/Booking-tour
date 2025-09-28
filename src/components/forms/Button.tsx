
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: ReactNode;
  className?: string;
}

const Button = ({ label, icon, className = "", ...props }: Props) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all 
        bg-indigo-600 text-white shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
