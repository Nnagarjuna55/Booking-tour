import React, { useEffect, useState } from "react";
import { getBookingsByClient } from "../../api/bookingApi";
import { BookingDTO } from "../../types/booking";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ClientDetail = ({ client }: { client: any }) => {
  const [bookings, setBookings] = useState<BookingDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getBookingsByClient(client._id);
        if (!mounted) return;
        setBookings(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load bookings");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [client]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Client Details</h3>
      <p className="text-sm">Name: {client.fullName}</p>
      <p className="text-sm">Email: {client.email}</p>
      <p className="text-sm mb-4">Phone: {client.phone}</p>

      <h4 className="text-md font-semibold mb-2">Bookings</h4>
      {loading ? (
        <p>Loading bookings…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings && bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b._id} className="p-2 border rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Place: {b.placeName || b.placeId}</div>
                  <div className="text-xs text-gray-600">Quantity: {b.quantity}</div>
                </div>
                <div className="text-right text-xs text-gray-600">
                  <div>{new Date(b.createdAt).toLocaleString()}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <FaClock /> <span>{b.slotTime || b.slotId}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No bookings found for this client.</p>
      )}
    </div>
  );
};

export default ClientDetail;
