import { useFetch } from "../../hooks/useFetch";
import { getPlaces } from "../../api/placeApi";
import { getSlotsByPlace, cancelSlot } from "../../api/slotApi";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Select from "../../components/forms/Select";
import { useState } from "react";
import DatePicker from "../../components/forms/DatePicker";
import { useUiContext } from "../../context/UiContext";
import FormModal from "../../components/modals/FormModal";
import SlotForm from "./SlotForm";

const SlotList = () => {
  const { data: places, loading: placesLoading } = useFetch(getPlaces, []);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const todayIso = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const { data: slots, loading: slotsLoading, error } = useFetch(
    () => (selectedPlace ? getSlotsByPlace(selectedPlace) : Promise.resolve([])),
    [selectedPlace]
  );

  const handleCancel = async (id: string) => {
    await cancelSlot(id);
    window.location.reload();
  };

  const { openModal, closeModal } = useUiContext();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Slots</h2>

      {/* Place Selector */}
      {placesLoading ? (
        <p className="text-gray-600">Loading places...</p>
      ) : (
        <Select
          label="Select Place"
          value={selectedPlace}
          onChange={(e) => setSelectedPlace(e.target.value)}
          className="mb-4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">-- Select --</option>
          {places?.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </Select>
      )}

      {/* Date Picker (filter slots for a particular date) */}
      <div className="mb-4">
        <DatePicker label="Date" value={selectedDate + "T00:00"} onChange={(val) => setSelectedDate(val.slice(0, 10))} />
      </div>

      {slotsLoading && <p className="mt-4 text-gray-600">Loading slots...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Selected place summary */}
      {selectedPlace && (
        <div className="mt-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">
            {places?.find((p) => p._id === selectedPlace)?.name || "Place"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {places?.find((p) => p._id === selectedPlace)?.location}
          </p>
        </div>
      )}

      {/* Slots Table */}
      {/* filter slots to selected date */}
      {slots && slots.filter(s => new Date(s.startAt).toISOString().slice(0,10) === selectedDate).length > 0 ? (
        <div className="mt-6 bg-white shadow-lg rounded-xl overflow-hidden">
          <DataTable
            headers={[
              "Start Time",
              "End Time",
              "Capacity",
              "Booked",
              "Status",
              "Actions",
            ]}
          >
            {slots.filter(s => new Date(s.startAt).toISOString().slice(0,10) === selectedDate).map((slot, i) => (
              <tr
                key={slot._id}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition-colors`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {/* show time only when same date as selectedDate */}
                  {new Date(slot.startAt).toISOString().slice(0,10) === selectedDate
                    ? new Date(slot.startAt).toLocaleTimeString()
                    : new Date(slot.startAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(slot.endAt).toISOString().slice(0,10) === selectedDate
                    ? new Date(slot.endAt).toLocaleTimeString()
                    : new Date(slot.endAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {slot.capacity}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {slot.bookedCount}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-semibold ${
                    slot.status === "CANCELLED"
                      ? "text-red-600"
                      : slot.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {slot.status}
                </td>
                <td className="px-4 py-3">
                  <TableActions
                    onEdit={() =>
                      openModal(
                        <FormModal title="Edit Slot" onClose={closeModal}>
                          <SlotForm placeId={selectedPlace} slot={slot} onSuccess={() => window.location.reload()} />
                        </FormModal>
                      )
                    }
                    onDelete={() => handleCancel(slot._id!)}
                  />
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      ) : (
        selectedPlace && (
          <p className="mt-4 text-gray-600">
            No slots available for this place.
          </p>
        )
      )}
    </div>
  );
};

export default SlotList;
