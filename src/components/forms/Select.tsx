
import { SelectHTMLAttributes, ReactNode } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: ReactNode;
  error?: string;
  icon?: ReactNode;
  className?: string;
}

const Select = ({
  label,
  children,
  error,
  icon,
  className = "",
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400 ${className}`}
      >
        {icon && <span className="text-gray-500 mr-2">{icon}</span>}
        <select
          {...props}
          className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none appearance-none text-gray-800 text-sm"
        >
          {children}
        </select>
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default Select;
