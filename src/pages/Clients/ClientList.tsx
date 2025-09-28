import { useFetch } from "../../hooks/useFetch";
import { getClients } from "../../api/clientApi";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Button from "../../components/forms/Button";
import { useUiContext } from "../../context/UiContext";
import FormModal from "../../components/modals/FormModal";
import ClientForm from "./ClientForm";
import ClientDetail from "./ClientDetail";
import { FaUserPlus } from "react-icons/fa";

const ClientList = () => {
  const { data: clients, loading, error } = useFetch(getClients, []);
  const { openModal, closeModal } = useUiContext();

  if (loading) return <p className="p-4 text-gray-600">Loading clients...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const handleAdd = () =>
    openModal(
      <FormModal title="Add Client" onClose={closeModal}>
        <ClientForm onSuccess={() => window.location.reload()} />
      </FormModal>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        <Button
          label="Add Client"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition-all"
          icon={<FaUserPlus />}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {clients && clients.length > 0 ? (
          <DataTable headers={["Name", "Email", "Phone", "Group Size", "Actions"]}>
            {clients.map((c, i) => (
              <tr
                key={c._id}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition-colors`}
                onClick={() => openModal(<FormModal title="Client" onClose={closeModal}><ClientDetail client={c} /></FormModal>)}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {c.fullName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{c.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{c.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{c.groupSize}</td>
                <td className="px-4 py-3">
                  <TableActions onEdit={() => alert("Edit feature")} />
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <p className="p-6 text-gray-600">No clients found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientList;
