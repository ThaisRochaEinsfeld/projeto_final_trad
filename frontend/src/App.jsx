import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import AdminOnboarding from "./pages/AdminOnboarding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/onboarding"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminOnboarding />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
