
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm 
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        <FaChevronLeft /> Prev
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition 
              ${
                p === page
                  ? "bg-indigo-600 text-white"
                  : "border text-gray-700 hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm 
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        Next <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
