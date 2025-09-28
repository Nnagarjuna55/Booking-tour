import { useForm } from "../../hooks/useForm";
import Input from "../../components/forms/Input";
import DatePicker from "../../components/forms/DatePicker";
import Button from "../../components/forms/Button";
import { createSlot, updateSlot } from "../../api/slotApi";
import { FaClock, FaUsers } from "react-icons/fa";

const SlotForm = ({
  placeId,
  onSuccess,
  slot,
}: {
  placeId: string;
  onSuccess: () => void;
  slot?: any;
}) => {
  const { values, handleChange, reset, setValues } = useForm({
    startAt: slot?.startAt || "",
    endAt: slot?.endAt || "",
    capacity: slot?.capacity ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic client-side validation
    const { startAt, endAt, capacity } = values as any;
    if (!startAt || !endAt) {
      alert("Please provide both start and end times for the slot.");
      return;
    }
    const start = new Date(startAt);
    const end = new Date(endAt);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      alert("End time must be after start time.");
      return;
    }
    const cap = Number(capacity);
    if (!cap || cap <= 0) {
      alert("Capacity must be a positive number.");
      return;
    }

    try {
      if (slot?._id) {
        await updateSlot(slot._id, { startAt, endAt, capacity: cap });
      } else {
        await createSlot({ startAt, endAt, capacity: cap, placeId });
      }
      reset();
      onSuccess();
    } catch (err: any) {
      // Show server-provided message when available
      const serverMsg = err?.response?.data?.message;
      const msg = serverMsg || err?.message || "Failed to create slot";
      alert(msg);
      // eslint-disable-next-line no-console
      console.error("createSlot error:", err);
    }
  };

  return (
    <div className="w-full">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <div className="flex items-center border rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-400">
            <FaClock className="text-gray-500 mr-2" />
            <DatePicker
              label="Start Time"
              value={values.startAt}
              onChange={(val) => setValues({ ...values, startAt: val })}
              className="flex-1 border-none bg-transparent focus:ring-0 text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Use the picker or type in YYYY-MM-DDThh:mm (local)</p>
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <div className="flex items-center border rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-400">
            <FaClock className="text-gray-500 mr-2" />
            <DatePicker
              label="End Time"
              value={values.endAt}
              onChange={(val) => setValues({ ...values, endAt: val })}
              className="flex-1 border-none bg-transparent focus:ring-0 text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">End time must be after start time</p>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
          <div className="flex items-center border rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-400">
            <FaUsers className="text-gray-500 mr-2" />
            <Input
              label="Capacity"
              type="number"
              name="capacity"
              value={values.capacity}
              onChange={handleChange}
              required
              className="flex-1 border-none bg-transparent focus:ring-0 text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">How many guests can this slot accept?</p>
        </div>

        {/* Button */}
        <Button
          label="Save Slot"
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
        />
      </form>
    </div>
  );
};

export default SlotForm;
