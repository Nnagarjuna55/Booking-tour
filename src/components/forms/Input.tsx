import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** When true the label won't be rendered (useful for inline inputs with icons) */
  hideLabel?: boolean;
}

const Input = ({ label, error, hideLabel, className, ...props }: Props) => {
  const base = "px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";
  // Allow parent to override border styling (e.g., border-none) via className
  const merged = `${base} ${className ?? "border"}`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {!hideLabel && label && <label className="text-sm font-medium">{label}</label>}
      <input {...props} className={merged} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;

