
import { ReactNode } from "react";
import { FaClock } from "react-icons/fa";

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  icon?: ReactNode;
  className?: string;
}

const DatePicker = ({
  label,
  value,
  onChange,
  error,
  icon = <FaClock className="text-gray-500 mr-2" />,
  className = "",
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400 ${className}`}
      >
        {icon}
        <input
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border-none bg-transparent focus:ring-0 text-gray-800 text-sm"
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default DatePicker;
