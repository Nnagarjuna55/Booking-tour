import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getPlace } from "../../api/placeApi";
import { getSlotsByPlace } from "../../api/slotApi";
import { getBookingsByPlace } from "../../api/bookingApi";
import DataTable from "../../components/tables/DataTable";
import Button from "../../components/forms/Button";
import { useUiContext } from "../../context/UiContext";
import FormModal from "../../components/modals/FormModal";
import SlotForm from "../Slots/SlotForm";

// React Icons
import { 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaPlusCircle, 
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaArrowLeft
} from "react-icons/fa";

const PlaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: place, loading: placeLoading } = useFetch(() => getPlace(id!), [id]);
  const { data: slots, loading: slotsLoading } = useFetch(() => getSlotsByPlace(id!), [id]);
  const { openModal, closeModal } = useUiContext();

  // Loading state with skeleton
  if (placeLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <FaInfoCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Place Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The place you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const handleAddSlot = () =>
    openModal(
      <FormModal title="Add Slot" onClose={closeModal}>
        <SlotForm placeId={id!} onSuccess={() => window.location.reload()} />
      </FormModal>
    );

  const totalCapacity = slots?.reduce((sum, slot) => sum + (slot.capacity || 0), 0) || 0;
  const totalBooked = slots?.reduce((sum, slot) => sum + (slot.bookedCount ?? 0), 0) || 0;
  const availableSlots = slots?.filter(slot => (slot.bookedCount ?? 0) < slot.capacity).length || 0;
  const [recentBookings, setRecentBookings] = useState<any[] | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getBookingsByPlace(id!);
        if (!mounted) return;
        setRecentBookings(data);
      } catch (e) {
        // ignore
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Places</span>
        </button>

        {/* Place Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400" />
            </div>
            {place.name}
          </h1>
        </div>

        {/* Place Info Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-900 dark:text-white">{place.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5">
                    <FaInfoCircle />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                    <p className="text-gray-900 dark:text-white leading-relaxed">{place.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <FaCalendarAlt className="w-3 h-3" />
                    Total Slots
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{slots?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <FaUsers className="w-3 h-3" />
                    Total Capacity
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{totalCapacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <FaClock className="w-3 h-3" />
                    Available Slots
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">{availableSlots}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slots Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Time Slots</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage booking slots for this place
            </p>
          </div>
          <Button
            label="Add New Slot"
            onClick={handleAddSlot}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
            icon={<FaPlusCircle />}
          />
        </div>

        {/* Slots Table Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {slotsLoading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
              </div>
            </div>
          ) : slots && slots.length > 0 ? (
            <div className="overflow-x-auto">
              <DataTable headers={["Start Time", "End Time", "Capacity", "Booked", "Availability"]}>
        {slots.map((slot, i) => {
          const booked = slot.bookedCount ?? 0;
          const isAvailable = booked < slot.capacity;
          const utilizationPercentage = (booked / slot.capacity) * 100;
                  
                  return (
                    <tr
                      key={slot._id}
                      className={`${
                        i % 2 === 0 
                          ? "bg-white dark:bg-gray-800" 
                          : "bg-gray-50 dark:bg-gray-700/50"
                      } hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                        {new Date(slot.startAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {new Date(slot.endAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {slot.capacity}
                      </td>
          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
            {slot.bookedCount ?? 0}
                      </td>
                      <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all bg-green-500`}
                                    style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                                  />
                                </div>
                                {/* NOTE: availability badge intentionally removed so admins can still attempt bookings; server enforces capacity */}
                              </div>
                            </td>
                    </tr>
                  );
                })}
              </DataTable>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No slots created yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get started by creating your first time slot for this place.
              </p>
              <Button
                label="Create First Slot"
                onClick={handleAddSlot}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                icon={<FaPlusCircle />}
              />
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings / Clients */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3">Recent Bookings (Clients)</h3>
        {recentBookings && recentBookings.length > 0 ? (
          <div className="space-y-3">
            {recentBookings.map((c) => (
              <div key={c.clientId} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">{c.clientName}</div>
                  <div className="text-sm text-gray-600">{c.clientPhone} • {c.clientEmail}</div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>Total Qty: {c.totalQuantity}</div>
                  <div>Last Slot: {c.lastSlotTime}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No booking clients yet.</p>
        )}
      </div>
    </div>
  );
};

export default PlaceDetail;