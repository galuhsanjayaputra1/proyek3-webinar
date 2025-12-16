import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import { DataProvider } from "./context/DataContext";

import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import EventDetail from "./pages/EventDetail";
import PaymentPage from "./pages/PaymentPage";
import CoursePage from "./pages/CoursePage";

// Admin Imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageTutors from "./pages/admin/ManageTutors";
import ManagePartners from "./pages/admin/ManagePartners";
import ManageLanding from "./pages/admin/ManageLanding";


const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useAdminAuth();
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AdminAuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/course/:id" element={<CoursePage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="tutors" element={<ManageTutors />} />
              <Route path="partners" element={<ManagePartners />} />
              <Route path="landing" element={<ManageLanding />} />
            </Route>


          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AdminAuthProvider>
  );
}

export default App;
