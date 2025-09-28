import { useForm } from "../../hooks/useForm";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import Button from "../../components/forms/Button";
import { createBooking } from "../../api/bookingApi";
import { getClients } from "../../api/clientApi";
import { getPlaces } from "../../api/placeApi";
import { getSlotsByPlace } from "../../api/slotApi";
import { useEffect, useState } from "react";
import { ClientDTO } from "../../types/client";
import { PlaceDTO } from "../../types/place";
import { SlotDTO } from "../../types/slot";

// React Icons
import { FaUser, FaMapMarkerAlt, FaClock, FaShoppingCart } from "react-icons/fa";

const BookingForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { values, handleChange, reset, setValues } = useForm({
    clientFullName: "",
    clientEmail: "",
    clientPhone: "",
    clientGroupSize: 1,
  clientId: "",
    placeId: "",
    slotId: "",
    quantity: 1,
  });
  const [places, setPlaces] = useState<PlaceDTO[]>([]);
  const [slots, setSlots] = useState<SlotDTO[]>([]);
  const [bookingResult, setBookingResult] = useState<{
    client?: any;
    placeName?: string;
    requested?: number;
    reserved?: number;
    bookingId?: string;
  } | null>(null);

  useEffect(() => {
    getPlaces().then(setPlaces);
  }, []);

  useEffect(() => {
    if (values.placeId) {
      getSlotsByPlace(values.placeId).then(setSlots);
    }
  }, [values.placeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // prepare payload: either clientId or client object
    const payload: any = {
      placeId: values.placeId,
      slotId: values.slotId,
      quantity: Number(values.quantity),
    };

    // Allow optionally passing an existing clientId. If provided, the server will use it.
    if (values.clientId) payload.clientId = values.clientId;

    // Always send a client object (we no longer support selecting existing clients)
    payload.client = {
      fullName: values.clientFullName,
      email: values.clientEmail,
      phone: values.clientPhone,
      groupSize: Number(values.clientGroupSize) || 1,
    };

    // basic client-side validation
    if (!payload.placeId || !payload.slotId || !payload.quantity) {
      alert("Please select place, slot and quantity before confirming.");
      return;
    }

  // no placeEmail sent: only client gets confirmation email

    // check capacity against selected slot (client-side friendly check)
    const selected = slots.find((s) => s._id === payload.slotId);
    if (selected) {
      const available = selected.capacity - (selected.bookedCount || 0);
      // If there are some seats available but less than requested, ask to confirm partial reservation.
      // If available === 0, do NOT block — proceed silently and let the server decide (it may return partial or full failure).
      if (payload.quantity > available && available > 0) {
        const ok = window.confirm(
          `Requested quantity (${payload.quantity}) exceeds available seats (${available}). The server will attempt to reserve available seats; do you want to continue?`
        );
        if (!ok) return;
      }
      // when available === 0: proceed without blocking; server will return reason if it can't reserve seats
    }

  try {
      // helpful debug info when things fail in dev
      // eslint-disable-next-line no-console
      console.debug("Creating booking with payload:", payload);
      const response: any = await createBooking(payload);
      // API returns { booking, requestedQuantity, reservedQuantity }
      const reserved = response?.reservedQuantity ?? response?.booking?.quantity ?? payload.quantity;
      const requested = response?.requestedQuantity ?? payload.quantity;

      // find place name for confirmation
      const place = places.find((p) => p._id === payload.placeId);

      // save result to show confirmation panel
      setBookingResult({
        client: payload.client,
        placeName: place?.name,
        requested,
        reserved,
        bookingId: response?.booking?._id,
      });

      if (reserved < requested) {
        alert(`Partial booking: requested ${requested}, reserved ${reserved}. The booking has been created for ${reserved} seats.`);
      } else {
        alert(`Booking successful for ${reserved} seats.`);
      }

      reset();
      onSuccess();
    } catch (err: any) {
      // prefer structured server message when available
      const serverData = err?.response?.data;
      const msg = serverData?.message || serverData || err.message || "Booking failed";
      // show friendly error and keep form values for correction
      alert(`Booking failed: ${msg}`);
      // log full response for debugging
      // eslint-disable-next-line no-console
      console.error("Booking error:", err, "serverResponse:", serverData);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Client */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              label="Client ID (optional)"
              name="clientId"
              value={values.clientId}
              onChange={handleChange}
              placeholder="Paste existing client id to reuse"
              className="border rounded-md px-3 py-2"
            />
            <Input
              label="Full name"
              name="clientFullName"
              value={values.clientFullName}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2"
            />
            <Input
              label="Email"
              name="clientEmail"
              value={values.clientEmail}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2"
            />
            <Input
              label="Phone"
              name="clientPhone"
              value={values.clientPhone}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2"
            />
            <Input
              label="Group size"
              name="clientGroupSize"
              type="number"
              value={values.clientGroupSize}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Place */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <Select
            label="Place"
            name="placeId"
            value={values.placeId}
            onChange={(e) => {
              const { name, value } = e.target;
              setValues((prev: any) => ({ ...prev, [name]: value, slotId: "" }));
            }}
            required
            className="flex-1 border-none bg-transparent focus:ring-0"
          >
            <option value="">-- Select Place --</option>
            {places.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </Select>
        </div>

        {/* place email removed: server will use Place record or env fallback */}
        {/* place email removed */}

        {/* Slot */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaClock className="text-gray-500 mr-2" />
          <Select
            label="Slot"
            name="slotId"
            value={values.slotId}
            onChange={handleChange}
            required
            className="flex-1 border-none bg-transparent focus:ring-0"
          >
            <option value="">-- Select Slot --</option>
            {slots.map((s) => (
              <option key={s._id} value={s._id}>
                {new Date(s.startAt).toLocaleString()} (Cap: {s.capacity}, Booked:{" "}
                {s.bookedCount})
              </option>
            ))}
          </Select>
        </div>

        {/* Quantity */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaShoppingCart className="text-gray-500 mr-2" />
          <Input
            label="Quantity"
            type="number"
            name="quantity"
            value={values.quantity}
            onChange={handleChange}
            required
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Button */}
        <Button
          label="Confirm Booking"
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
        />
      </form>

      {bookingResult && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="font-semibold text-green-800 mb-2">Booking Confirmation</h3>
          <p className="text-sm text-green-700">Client: {bookingResult.client?.fullName} ({bookingResult.client?.phone})</p>
          <p className="text-sm text-green-700">Email: {bookingResult.client?.email}</p>
          <p className="text-sm text-green-700">Place: {bookingResult.placeName}</p>
          <p className="text-sm text-green-700">Requested: {bookingResult.requested}, Reserved: {bookingResult.reserved}</p>
          {bookingResult.bookingId && (
            <p className="text-sm text-green-700">Booking ID: {bookingResult.bookingId}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
