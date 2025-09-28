import { useEffect, useState } from "react";
import StatsCard from "../../components/cards/StatsCard";
import { getSummaryReport, getTopPlaces, getActivePlacesCount } from "../../api/reportApi";

// React Icons
import { FaCalendarCheck, FaMapMarkerAlt, FaUsers, FaTimesCircle } from "react-icons/fa";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<
    { title: string; value: number; icon: JSX.Element; color: string }[]
  >([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const summary = await getSummaryReport();
        const topPlaces = await getTopPlaces(5);
        // fetch number of active places via API helper (includes auth)
        const activeJson = await getActivePlacesCount();

        if (!mounted) return;

        setStats([
          {
            title: "Total Bookings",
            value: summary.totalBookings ?? 0,
            icon: <FaCalendarCheck />,
            color: "bg-blue-500",
          },
          {
            title: "Active Places",
            value: activeJson?.count ?? 0,
            icon: <FaMapMarkerAlt />,
            color: "bg-green-500",
          },
          {
            title: "Clients",
            value: summary.confirmed ?? 0,
            icon: <FaUsers />,
            color: "bg-purple-500",
          },
          {
            title: "Cancelled",
            value: summary.cancelled ?? 0,
            icon: <FaTimesCircle />,
            color: "bg-red-500",
          },
        ]);
      } catch (err: any) {
        setError(err?.message || "Failed to load dashboard data");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Dashboard
      </h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading summary…</p>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-3 rounded-md bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
              {error}. Showing fallback values.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StatsCard
                key={s.title}
                title={s.title}
                value={s.value}
                icon={s.icon}
                color={s.color}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
