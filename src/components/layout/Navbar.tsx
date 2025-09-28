// import { useAuth } from "../../hooks/useAuth";

// const Navbar = () => {
//   const { logout, user } = useAuth();

//   return (
//     <header className="w-full bg-gray-100 shadow-sm flex justify-between items-center px-6 py-3">
//       <h1 className="text-lg font-semibold">Admin Dashboard</h1>
//       <div className="flex items-center gap-4">
//         <span className="text-gray-700">{user?.email}</span>
//         <button
//           onClick={logout}
//           className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { useAuth } from "../../hooks/useAuth";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow flex justify-between items-center px-6 py-3">
      {/* Logo / Title */}
      <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {/* User Avatar + Email */}
        <div className="flex items-center gap-2 text-gray-700">
          <FaUserCircle className="text-2xl text-indigo-600" />
          <span className="hidden sm:inline">{user?.email}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow transition-all"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
