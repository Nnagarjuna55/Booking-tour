import { useFetch } from "../../hooks/useFetch";
import { getBookings, cancelBooking } from "../../api/bookingApi";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Button from "../../components/forms/Button";
import { useUiContext } from "../../context/UiContext";
import FormModal from "../../components/modals/FormModal";
import BookingForm from "./BookingForm";

// React Icons
import { FaPlus } from "react-icons/fa";

const BookingList = () => {
  const { data: bookings, loading, error } = useFetch(getBookings, []);
  const { openModal, closeModal } = useUiContext();

  if (loading) return <p className="p-4 text-gray-600">Loading bookings...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const handleAdd = () =>
    openModal(
      <FormModal title="Create Booking" onClose={closeModal}>
        <BookingForm onSuccess={() => window.location.reload()} />
      </FormModal>
    );

  const handleCancel = async (id: string) => {
    await cancelBooking(id);
    window.location.reload();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bookings</h2>
        <Button
          label="Create Booking"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition-all"
          icon={<FaPlus />}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {bookings && bookings.length > 0 ? (
          <DataTable
            headers={[
              "Client",
              "Place",
              "Slot",
              "Quantity",
              "Status",
              "Actions",
            ]}
          >
            {bookings.map((b, i) => (
              <tr
                key={b._id}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition-colors`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {b.clientSnapshot?.fullName ||
                    (typeof b.clientId === "object" ? b.clientId?.fullName : b.clientId)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {typeof b.placeId === "object" ? b.placeId?.name : b.placeId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {typeof b.slotId === "object" && b.slotId?.startAt
                    ? new Date(b.slotId.startAt).toLocaleString()
                    : b.slotTime || "—"}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {b.quantity}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-semibold ${
                    b.status === "cancelled"
                      ? "text-red-600"
                      : b.status === "confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {b.status}
                </td>
                <td className="px-4 py-3">
                  <TableActions
                    onDelete={() => handleCancel(b._id!)}
                    onEdit={() => alert("Reschedule flow")}
                  />
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <p className="p-6 text-gray-600">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingList;
