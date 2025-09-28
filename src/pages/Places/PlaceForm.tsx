
import { useForm } from "../../hooks/useForm";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";
import { createPlace, updatePlace } from "../../api/placeApi";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaFileImage,
  FaInfoCircle,
  FaBuilding,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";

const PlaceForm = ({
  onSuccess,
  place,
}: {
  onSuccess: () => void;
  place?: any;
}) => {
  const { values, handleChange, reset, setValues } = useForm({
    name: "",
    location: "",
    description: "",
  });

  // prefill when editing - useEffect avoids updating state during render
  useEffect(() => {
    if (!place) return;
    setValues({
      name: place.name || "",
      location: place.location || "",
      description: place.description || "",
    });
    setExistingImages(place.images || []);
    if (place.slots && Array.isArray(place.slots)) {
      setSlots(
        place.slots.map((s: any) => ({ startAt: s.startAt, endAt: s.endAt, capacity: s.capacity }))
      );
    }
  }, [place, setValues]);

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(place?.images || []);
  const [slots, setSlots] = useState<
    { startAt: string; endAt: string; capacity: number }[]
  >([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const addSlot = () =>
    setSlots((s) => [...s, { startAt: "", endAt: "", capacity: 1 }]);
  const updateSlot = (idx: number, field: string, value: any) =>
    setSlots((s) =>
      s.map((sl, i) => (i === idx ? { ...sl, [field]: value } : sl))
    );
  const removeSlot = (idx: number) =>
    setSlots((s) => s.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", values.name);
    form.append("location", values.location);
    form.append("description", values.description);
    for (const img of images) form.append("images", img);
    if (slots.length) form.append("slots", JSON.stringify(slots));
    if (place && place._id) {
      // when editing, allow sending FormData to updatePlace
      await updatePlace(place._id, form);
    } else {
      await createPlace(form);
    }
    reset();
    setImages([]);
    setSlots([]);
    onSuccess();
  };

  return (
    <div className="w-full">

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
          <FaBuilding className="text-gray-500 mr-2" />
          <Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            hideLabel
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Location */}
        <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            required
            hideLabel
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Description */}
        <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
          <FaInfoCircle className="text-gray-500 mr-2" />
          <Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            hideLabel
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block">
            <div className="border-2 border-dashed border-gray-200 rounded-md p-4 flex items-center justify-center flex-col cursor-pointer hover:border-indigo-400 transition-colors">
              <FaFileImage className="text-gray-400 text-2xl mb-2" />
              <span className="text-sm text-gray-600">Click to choose images or drag them here</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFiles}
                className="hidden"
              />
            </div>
          </label>

          <div className="mt-3 flex gap-3 flex-wrap">
            {existingImages && existingImages.map((url: string, idx: number) => (
              <div key={`exist-${idx}`} className="w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                <img src={url} alt={`img-${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {images.length > 0 && images.map((f, idx) => (
              <div key={`new-${idx}`} className="w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Slots */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaPlusCircle className="text-indigo-600" /> Slots
            </h4>
            <button
              type="button"
              onClick={addSlot}
              className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800"
            >
              <FaPlusCircle /> Add Slot
            </button>
          </div>

          <div className="space-y-2">
            {slots.length === 0 && <p className="text-sm text-gray-500">No slots added yet.</p>}

            {slots.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-start">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start</label>
                  <input
                    type="datetime-local"
                    value={s.startAt}
                    onChange={(e) => updateSlot(i, "startAt", e.target.value)}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded w-full"
                    aria-label={`slot-${i}-start`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">End</label>
                  <input
                    type="datetime-local"
                    value={s.endAt}
                    onChange={(e) => updateSlot(i, "endAt", e.target.value)}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded w-full"
                    aria-label={`slot-${i}-end`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Capacity</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={s.capacity}
                      onChange={(e) => updateSlot(i, "capacity", Number(e.target.value))}
                      className="px-3 py-2 w-28 text-sm bg-white border border-gray-300 rounded"
                      aria-label={`slot-${i}-capacity`}
                    />
                    <button type="button" onClick={() => removeSlot(i)} className="text-red-500 hover:text-red-700 mt-6">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button
          label="Save"
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
        />
      </form>
    </div>
  );
};

export default PlaceForm;
