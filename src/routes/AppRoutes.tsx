import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import PlaceList from "../pages/Places/PlaceList";
import PlaceDetail from "../pages/Places/PlaceDetail";
import SlotList from "../pages/Slots/SlotList";
import ClientList from "../pages/Clients/ClientList";
import BookingList from "../pages/Bookings/BookingList";
import Reports from "../pages/Reports/Reports";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-gray-50">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />
      <Route
        path="/places"
        element={
          <ProtectedLayout>
            <PlaceList />
          </ProtectedLayout>
        }
      />
      <Route
        path="/places/:id"
        element={
          <ProtectedLayout>
            <PlaceDetail />
          </ProtectedLayout>
        }
      />
      <Route
        path="/slots"
        element={
          <ProtectedLayout>
            <SlotList />
          </ProtectedLayout>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedLayout>
            <ClientList />
          </ProtectedLayout>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedLayout>
            <BookingList />
          </ProtectedLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedLayout>
            <Reports />
          </ProtectedLayout>
        }
      />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<p className="p-6">404 Not Found</p>} />
    </Routes>
  );
};

export default AppRoutes;
