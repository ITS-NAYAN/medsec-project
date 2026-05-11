import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Dashboard Stats
  // ===============================
  useEffect(() => {

    const fetchDashboardStats = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://127.0.0.1:8000/admin/stats/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setStats(data);

      } catch (error) {

        console.error("Dashboard Stats Error:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboardStats();

  }, []);

  // ===============================
  // Pie Chart Data
  // ===============================
  const pieData = [
    {
      name: "Admin",
      value: stats?.total_admins || 0,
    },
    {
      name: "Doctor",
      value: stats?.total_doctors || 0,
    },
    {
      name: "Staff",
      value: stats?.total_staff || 0,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#10b981",
    "#8b5cf6",
  ];

  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

        {/* Background Blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 blur-3xl rounded-full" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 blur-3xl rounded-full" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">

          {/* ================= HEADER ================= */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12">

            <div>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm mb-5">
                🛡️ Administrative Control Center
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-5">
                MedSec Admin Dashboard
              </h1>

              <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                Monitor healthcare operations, platform users,
                clinics, patient records, and security governance
                through a centralized AI-powered administrative system.
              </p>

            </div>

            {/* Status Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl px-8 py-7 min-w-[220px]">

              <div className="text-sm text-slate-500 mb-3">
                System Status
              </div>

              <div className="flex items-center gap-3">

                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />

                <span className="font-bold text-emerald-600 text-2xl">
                  Operational
                </span>

              </div>

            </div>

          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">

            {/* Clinics */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-start justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  🏥
                </div>

                <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  Clinics
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : stats?.total_clinics || 0}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Registered healthcare clinics
              </p>

            </div>

            {/* Users */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-start justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl">
                  👥
                </div>

                <div className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                  Users
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : stats?.total_users || 0}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Platform registered users
              </p>

            </div>

            {/* Patients */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-start justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
                  🧑‍⚕️
                </div>

                <div className="text-xs bg-pink-50 text-pink-700 px-3 py-1 rounded-full font-semibold">
                  Patients
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : stats?.total_patients || 0}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Registered patients
              </p>

            </div>

            {/* Records */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-start justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">
                  📄
                </div>

                <div className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-semibold">
                  Records
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : stats?.total_records || 0}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Uploaded medical records
              </p>

            </div>

            {/* Security */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-start justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-3xl">
                  🔐
                </div>

                <div className="text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full font-semibold">
                  Security
                </div>

              </div>

              <div className="text-4xl font-black text-slate-900 mb-2">
                Active
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Role-based access enabled
              </p>

            </div>

          </div>

          {/* ================= ANALYTICS ================= */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">

            {/* User Distribution */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-8">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    User Distribution
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Platform role segmentation
                  </p>

                </div>

                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Live Data
                </div>

              </div>

              {!stats ? (

                <div className="h-[320px] flex flex-col items-center justify-center text-center">

                  <div className="text-6xl mb-4">
                    📊
                  </div>

                  <h3 className="text-xl font-bold text-slate-700 mb-2">
                    Analytics Loading
                  </h3>

                  <p className="text-slate-500">
                    Fetching platform analytics...
                  </p>

                </div>

              ) : (

                <ResponsiveContainer width="100%" height={320}>

                  <PieChart>

                    <Pie
                      data={pieData}
                      dataKey="value"
                      outerRadius={110}
                      innerRadius={70}
                      paddingAngle={5}
                    >

                      {pieData.map((_, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />

                      ))}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              )}

            </div>

            {/* Compliance */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-3xl shadow-2xl p-8 text-white">

              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />

              <div className="relative z-10">

                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6">
                  🛡️ Compliance Monitoring
                </div>

                <h2 className="text-4xl font-black mb-4">
                  Security & Governance
                </h2>

                <p className="text-blue-100 text-lg leading-relaxed mb-8">
                  MedSec follows modern healthcare compliance standards
                  and enterprise-grade security practices.
                </p>

                <div className="space-y-4">

                  {[
                    "ABDM Guidelines Compliance",
                    "DPDP Act 2023 Alignment",
                    "Encrypted Medical Records",
                    "Role-Based Access Control",
                    "AI-Assisted Healthcare Security",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/10"
                    >

                      <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center">
                        ✅
                      </div>

                      <span className="font-medium">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* ================= PLATFORM INSIGHTS ================= */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

              <div>

                <h2 className="text-3xl font-bold text-slate-900">
                  Platform Insights
                </h2>

                <p className="text-slate-500 mt-2">
                  Real-time overview of healthcare infrastructure activity
                </p>

              </div>

              <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold">
                Live Metrics
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5">

              {/* Users */}
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 hover:bg-blue-50/50 transition-all">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                    👥
                  </div>

                  <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    Users
                  </div>

                </div>

                <div className="text-4xl font-black text-slate-900 mb-2">
                  {stats?.total_users || 0}
                </div>

                <p className="text-slate-500">
                  Total registered users on MedSec
                </p>

              </div>

              {/* Records */}
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 hover:bg-emerald-50/50 transition-all">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
                    📄
                  </div>

                  <div className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Records
                  </div>

                </div>

                <div className="text-4xl font-black text-slate-900 mb-2">
                  {stats?.total_records || 0}
                </div>

                <p className="text-slate-500">
                  Medical reports uploaded securely
                </p>

              </div>

              {/* Clinics */}
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 hover:bg-violet-50/50 transition-all">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-2xl">
                    🏥
                  </div>

                  <div className="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-semibold">
                    Clinics
                  </div>

                </div>

                <div className="text-4xl font-black text-slate-900 mb-2">
                  {stats?.total_clinics || 0}
                </div>

                <p className="text-slate-500">
                  Connected healthcare organizations
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}