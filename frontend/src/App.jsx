// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FirstTimeProfile from "./pages/FirstTimeProfile";

import DoctorDashboard from "./pages/DoctorDashboard";
import AIAnalysisPage from "./pages/AIAnalysisPage";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorUploadRecord from "./pages/DoctorUploadRecords";
import DoctorRecords from "./pages/DoctorRecords";

import StaffDashboard from "./pages/StaffDashboard";
import StaffPatientRecords from "./pages/StaffPatientRecords";
import StaffPatients from "./pages/StaffPatients";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminClinics from "./pages/AdminClinics";
import AdminAuditLogs from "./pages/AdminAuditLogs";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminAccessRequests from "./pages/AdminAccessRequests";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC INFO PAGES ================= */}
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/first-time-profile" element={<FirstTimeProfile />} />

        {/* ================= DOCTOR ROUTES ================= */}

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/records"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/upload-record"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorUploadRecord />
            </ProtectedRoute>
          }
        />

        {/* ✅ NEW AI ANALYSIS ROUTE */}
        <Route
          path="/doctor/ai-analysis"
          element={
            <ProtectedRoute allowedRole="doctor">
              <AIAnalysisPage />
            </ProtectedRoute>
          }
        />

        {/* ================= STAFF ROUTES ================= */}

        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/records"
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffPatientRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/patients"
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffPatients />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/clinics"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminClinics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/audit-logs"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminAuditLogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/access"
          element={<AdminAccessRequests />}
        />

      </Routes>
    </BrowserRouter>
  );
}