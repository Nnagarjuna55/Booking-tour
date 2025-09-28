import { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color?: string; // Tailwind bg color class (e.g., "bg-blue-500")
}

const StatsCard = ({ title, value, icon, color = "bg-indigo-500" }: Props) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
      {/* Icon */}
      {icon && (
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-lg ${color}`}
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col text-left">
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
