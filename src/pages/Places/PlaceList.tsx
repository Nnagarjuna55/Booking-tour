import { useFetch } from "../../hooks/useFetch";
import { getPlaces, deletePlace } from "../../api/placeApi";
import TableActions from "../../components/tables/TableActions";
import Button from "../../components/forms/Button";
import { useUiContext } from "../../context/UiContext";
import FormModal from "../../components/modals/FormModal";
import PlaceForm from "./PlaceForm";
import PlaceCard from "../../components/cards/PlaceCard";
import SlotForm from "../Slots/SlotForm";
import { FaPlusCircle } from "react-icons/fa";

const PlaceList = () => {
  const { data: places, loading, error } = useFetch(getPlaces, []);
  const { openModal, closeModal } = useUiContext();

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const handleDelete = async (id: string) => {
    await deletePlace(id);
    window.location.reload();
  };

  const handleCreate = () =>
    openModal(
      <FormModal title="Add Place" onClose={closeModal}>
        <PlaceForm onSuccess={() => window.location.reload()} />
      </FormModal>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Places</h2>
        <Button
          label="Add Place"
          onClick={handleCreate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition-all"
          icon={<FaPlusCircle />}
        />
      </div>

      {/* Grid - center content and constrain card widths so they don't stretch too wide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {places?.map((p) => (
          <div key={p._id} className="w-full max-w-sm h-full">
            <PlaceCard
              place={p}
              onAddSlot={(id: string) =>
                openModal(
                  <FormModal title="Add Slot" onClose={closeModal}>
                    <SlotForm placeId={id} onSuccess={() => window.location.reload()} />
                  </FormModal>
                )
              }
              onEdit={(id: string) =>
                openModal(
                  <FormModal title="Edit Place" onClose={closeModal}>
                    <PlaceForm place={p} onSuccess={() => window.location.reload()} />
                  </FormModal>
                )
              }
              onDelete={() => handleDelete(p._id!)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
