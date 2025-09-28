import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import {
  getSummaryReport,
  getTopPlaces,
  getSlotUtilization,
} from "../../api/reportApi";
import DataTable from "../../components/tables/DataTable";
import StatsCard from "../../components/cards/StatsCard";
import Select from "../../components/forms/Select";
import { getPlaces } from "../../api/placeApi";
import { PlaceDTO } from "../../types/place";

// React Icons
import { FaCalendarCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Reports = () => {
  const { data: summary, loading: summaryLoading } = useFetch(
    () => getSummaryReport(),
    []
  );

  const { data: topPlaces, loading: topLoading } = useFetch(
    () => getTopPlaces(5),
    []
  );

  const [places, setPlaces] = useState<PlaceDTO[]>([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [utilization, setUtilization] = useState<any[]>([]);

  const loadUtilization = async (placeId: string) => {
    const data = await getSlotUtilization(placeId);
    setUtilization(data);
  };

  useFetch(async () => {
    const data = await getPlaces();
    setPlaces(data);
    return null;
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Reports</h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {summaryLoading ? (
          <p className="text-gray-600">Loading summary...</p>
        ) : (
          <>
            <StatsCard
              title="Total Bookings"
              value={summary?.totalBookings || 0}
              icon={<FaCalendarCheck />}
              color="bg-blue-500"
            />
            <StatsCard
              title="Confirmed"
              value={summary?.confirmed || 0}
              icon={<FaCheckCircle />}
              color="bg-green-500"
            />
            <StatsCard
              title="Cancelled"
              value={summary?.cancelled || 0}
              icon={<FaTimesCircle />}
              color="bg-red-500"
            />
          </>
        )}
      </div>

      {/* Top Places Section */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Top Places</h3>
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {topLoading ? (
            <p className="p-6 text-gray-600">Loading top places...</p>
          ) : topPlaces && topPlaces.length > 0 ? (
            <DataTable headers={["Place ID", "Total Bookings"]}>
              {topPlaces.map((p, i) => (
                <tr
                  key={p._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition-colors`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {p._id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{p.total}</td>
                </tr>
              ))}
            </DataTable>
          ) : (
            <p className="p-6 text-gray-600">No data available.</p>
          )}
        </div>
      </div>

      {/* Slot Utilization Section */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Slot Utilization
        </h3>

        <Select
          label="Select Place"
          value={selectedPlace}
          onChange={(e) => {
            setSelectedPlace(e.target.value);
            loadUtilization(e.target.value);
          }}
          className="mb-4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">-- Select --</option>
          {places.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </Select>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {utilization && utilization.length > 0 ? (
            <DataTable headers={["Slot ID", "Total Bookings"]}>
              {utilization.map((u, i) => (
                <tr
                  key={u._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition-colors`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {u._id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.total}</td>
                </tr>
              ))}
            </DataTable>
          ) : (
            selectedPlace && (
              <p className="p-6 text-gray-600">No utilization data.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
