import { useEffect, useMemo, useState } from "react";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminAuditLogs() {

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filterAction, setFilterAction] = useState("");

  const [filterUser, setFilterUser] = useState("");

  // =========================================
  // Fetch Audit Logs
  // =========================================
  useEffect(() => {

    const fetchAuditLogs = async () => {

      try {

        const token = localStorage.getItem("token");

        /*
          Replace with real endpoint later if backend exists:
          /admin/audit-logs
        */

        const response = await fetch(
          "http://127.0.0.1:8000/admin/audit-logs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {

          setLogs([]);

          return;

        }

        const data = await response.json();

        if (Array.isArray(data)) {

          setLogs(data);

        } else if (data.logs) {

          setLogs(data.logs);

        } else {

          setLogs([]);

        }

      } catch (error) {

        console.error("Audit Logs Error:", error);

        setLogs([]);

      } finally {

        setLoading(false);

      }
    };

    fetchAuditLogs();

  }, []);

  // =========================================
  // Filters
  // =========================================
  const filteredLogs = useMemo(() => {

    return logs.filter((log) => {

      const actionMatch =
        filterAction === "" ||
        log.action === filterAction;

      const userMatch =
        filterUser === "" ||
        log.user?.toLowerCase().includes(
          filterUser.toLowerCase()
        );

      return actionMatch && userMatch;

    });

  }, [logs, filterAction, filterUser]);

  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 blur-3xl rounded-full" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 blur-3xl rounded-full" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">

          {/* ========================================= */}
          {/* Header */}
          {/* ========================================= */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-10">

            <div>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm mb-5">
                📜 System Governance
              </div>

              <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-4">
                Audit Logs
              </h1>

              <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                Monitor platform activities, administrative actions,
                healthcare operations, and system-level events with
                enterprise-grade audit visibility.
              </p>

            </div>

            {/* Status Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl px-8 py-7 min-w-[240px]">

              <div className="text-sm text-slate-500 mb-3">
                Audit Monitoring
              </div>

              <div className="flex items-center gap-3">

                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />

                <span className="font-bold text-emerald-600 text-2xl">
                  Active
                </span>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Stats */}
          {/* ========================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {/* Total Logs */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg">

              <div className="flex items-start justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  📄
                </div>

                <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  Logs
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : logs.length}
              </div>

              <p className="text-slate-500 text-sm">
                Total audit events tracked
              </p>

            </div>

            {/* Filtered */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg">

              <div className="flex items-start justify-between mb-6">

                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-3xl">
                  🔎
                </div>

                <div className="text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full font-semibold">
                  Filtered
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : filteredLogs.length}
              </div>

              <p className="text-slate-500 text-sm">
                Logs matching current filters
              </p>

            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden">

              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-3xl rounded-full" />

              <div className="relative">

                <div className="flex items-start justify-between mb-6">

                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl">
                    🔐
                  </div>

                  <div className="text-xs bg-white/10 px-3 py-1 rounded-full font-semibold">
                    Security
                  </div>

                </div>

                <div className="text-4xl font-black mb-2">
                  Protected
                </div>

                <p className="text-blue-100 text-sm">
                  Immutable healthcare audit monitoring
                </p>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Filters */}
          {/* ========================================= */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-lg p-6 mb-10">

            <div className="flex flex-col lg:flex-row gap-4">

              {/* Action Filter */}
              <select
                className="
                  px-5 py-4 rounded-2xl border border-slate-200
                  bg-slate-50/70
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-400
                  transition-all
                  text-slate-700
                  font-medium
                "
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
              >

                <option value="">
                  All Actions
                </option>

                <option value="VIEW_RECORD">
                  View Record
                </option>

                <option value="UPLOAD_RECORD">
                  Upload Record
                </option>

                <option value="UPDATE_USER_ROLE">
                  Update User Role
                </option>

              </select>

              {/* Search User */}
              <input
                type="text"
                placeholder="Search by user..."
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="
                  flex-1
                  px-5 py-4 rounded-2xl border border-slate-200
                  bg-slate-50/70
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-400
                  transition-all
                "
              />

            </div>

          </div>

          {/* ========================================= */}
          {/* Audit Table */}
          {/* ========================================= */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">

            {/* Table Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  System Audit Events
                </h2>

                <p className="text-slate-500 mt-1">
                  Enterprise healthcare activity monitoring
                </p>

              </div>

              <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold">
                Live Monitoring
              </div>

            </div>

            {/* Empty State */}
            {!loading && filteredLogs.length === 0 ? (

              <div className="py-24 text-center px-6">

                <div className="text-7xl mb-6">
                  📭
                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  No Audit Logs Available
                </h3>

                <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                  No audit activities match the current filters.
                  Once platform monitoring is active, audit events
                  will appear here automatically.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-slate-50 border-b border-slate-100">

                    <tr className="text-left">

                      <th className="px-8 py-5 text-sm font-bold text-slate-600">
                        Timestamp
                      </th>

                      <th className="px-8 py-5 text-sm font-bold text-slate-600">
                        User
                      </th>

                      <th className="px-8 py-5 text-sm font-bold text-slate-600">
                        Role
                      </th>

                      <th className="px-8 py-5 text-sm font-bold text-slate-600">
                        Action
                      </th>

                      <th className="px-8 py-5 text-sm font-bold text-slate-600">
                        Resource
                      </th>

                      <th className="px-8 py-5 text-sm font-bold text-slate-600">
                        Hash
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredLogs.map((log, index) => (

                      <tr
                        key={index}
                        className="
                          border-b border-slate-100
                          hover:bg-blue-50/40
                          transition-all
                        "
                      >

                        {/* Timestamp */}
                        <td className="px-8 py-6 text-sm text-slate-600 whitespace-nowrap">
                          {log.timestamp || "N/A"}
                        </td>

                        {/* User */}
                        <td className="px-8 py-6">

                          <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
                              {log.user?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div>

                              <div className="font-semibold text-slate-800">
                                {log.user || "Unknown User"}
                              </div>

                              <div className="text-xs text-slate-500">
                                Healthcare Platform User
                              </div>

                            </div>

                          </div>

                        </td>

                        {/* Role */}
                        <td className="px-8 py-6">

                          <span className="
                            inline-flex items-center
                            px-3 py-1 rounded-full
                            bg-slate-100 text-slate-700
                            text-xs font-semibold
                          ">
                            {log.role || "N/A"}
                          </span>

                        </td>

                        {/* Action */}
                        <td className="px-8 py-6">

                          <span
                            className={`
                              inline-flex items-center
                              px-4 py-2 rounded-full
                              text-xs font-bold
                              ${
                                log.action === "UPLOAD_RECORD"
                                  ? "bg-blue-100 text-blue-700"
                                  : log.action === "UPDATE_USER_ROLE"
                                  ? "bg-violet-100 text-violet-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }
                            `}
                          >
                            {log.action?.replaceAll("_", " ") || "N/A"}
                          </span>

                        </td>

                        {/* Resource */}
                        <td className="px-8 py-6 text-slate-600 whitespace-nowrap">
                          {log.resource || "N/A"}
                        </td>

                        {/* Hash */}
                        <td className="px-8 py-6">

                          <code className="
                            text-xs font-mono
                            bg-slate-100 text-slate-700
                            px-3 py-2 rounded-xl
                          ">
                            {log.hash || "N/A"}
                          </code>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>
    </>
  );
}