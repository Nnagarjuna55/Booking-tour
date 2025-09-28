// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-white shadow-md h-screen fixed">
//       <div className="p-4 text-xl font-bold border-b">Tourist Admin</div>
//       <nav className="p-4 flex flex-col gap-3">
//         <Link to="/dashboard" className="hover:text-blue-600">
//           Dashboard
//         </Link>
//         <Link to="/places" className="hover:text-blue-600">
//           Places
//         </Link>
//         <Link to="/slots" className="hover:text-blue-600">
//           Slots
//         </Link>
//         <Link to="/clients" className="hover:text-blue-600">
//           Clients
//         </Link>
//         <Link to="/bookings" className="hover:text-blue-600">
//           Bookings
//         </Link>
//         <Link to="/reports" className="hover:text-blue-600">
//           Reports
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/places", label: "Places", icon: <FaMapMarkerAlt /> },
    { to: "/slots", label: "Slots", icon: <FaClock /> },
    { to: "/clients", label: "Clients", icon: <FaUsers /> },
    { to: "/bookings", label: "Bookings", icon: <FaClipboardList /> },
    { to: "/reports", label: "Reports", icon: <FaChartBar /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 flex flex-col">
      {/* Brand */}
      <div className="p-4 text-xl font-bold border-b text-indigo-600">
        Tourist Admin
      </div>

      {/* Nav */}
      <nav className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
