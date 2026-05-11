// src/components/AppNavbar.jsx
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar"; // Public navbar (Access Portal)
import AdminNavbar from "./AdminNavbar";
import DoctorNavbar from "./DoctorNavbar";
import StaffNavbar from "./StaffNavbar"; // Make sure this exists

export default function AppNavbar() {
  const { pathname } = useLocation();

  // ✅ Most reliable: route-based navbar selection
  if (pathname.startsWith("/admin")) return <AdminNavbar />;
  if (pathname.startsWith("/doctor")) return <DoctorNavbar />;
  if (pathname.startsWith("/staff")) return <StaffNavbar />;

  // ✅ Public routes
  return <Navbar />;
}