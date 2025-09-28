
import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const FormModal = ({ title, children, onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
  <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default FormModal;
