// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRole, children }) {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // 🔐 If no token → not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 If role mismatch → not authorized
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}