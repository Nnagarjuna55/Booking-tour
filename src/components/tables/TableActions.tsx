import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

const TableActions = ({ onEdit, onDelete }: Props) => {
  return (
    <div className="flex gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          title="Edit"
          className="p-1.5 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 transition"
        >
          <FaEdit className="text-sm" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          title="Delete"
          className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaTrash className="text-sm" />
        </button>
      )}
    </div>
  );
};

export default TableActions;
