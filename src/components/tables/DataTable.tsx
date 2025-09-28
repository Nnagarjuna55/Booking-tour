
import { ReactNode } from "react";

interface Props {
  headers: string[];
  children: ReactNode;
}

const DataTable = ({ headers, children }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 font-semibold text-sm border-b"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

export default DataTable;
