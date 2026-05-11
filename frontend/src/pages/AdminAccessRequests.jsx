import { useEffect, useMemo, useState } from "react";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminAccessRequests() {

  const [requests, setRequests] = useState([]);

  const [filter, setFilter] = useState("pending");

  const [loading, setLoading] = useState(true);

  const [processingId, setProcessingId] = useState(null);

  const [search, setSearch] = useState("");

  // =========================================
  // Fetch Requests
  // =========================================
  const fetchRequests = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://127.0.0.1:8000/access/?status=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setRequests(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Failed to fetch requests:", error);

      setRequests([]);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchRequests();

  }, [filter]);

  // =========================================
  // Approve / Reject
  // =========================================
  const handleAction = async (id, action) => {

    try {

      setProcessingId(id);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://127.0.0.1:8000/access/${action}/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {

        alert(data.detail || "Error");

        return;
      }

      fetchRequests();

    } catch (error) {

      console.error(error);

      alert("Something went wrong");

    } finally {

      setProcessingId(null);

    }
  };

  // =========================================
  // Search + Filter
  // =========================================
  const filteredRequests = useMemo(() => {

    return requests.filter((r) => {

      return (
        r.patient_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        r.record_title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        r.clinic_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        r.requested_by
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

    });

  }, [requests, search]);

  // =========================================
  // Status Style
  // =========================================
  const getStatusStyle = (status) => {

    if (status === "approved") {

      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "rejected") {

      return "bg-red-100 text-red-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  return (
    <>
      <AdminNavbar />

      <main className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50 via-white to-blue-50
        overflow-hidden
      ">

        {/* Background Blur */}
        <div className="
          absolute inset-0
          overflow-hidden
          pointer-events-none
        ">

          <div className="
            absolute top-0 left-0
            w-96 h-96
            bg-blue-200/20
            blur-3xl
            rounded-full
          " />

          <div className="
            absolute bottom-0 right-0
            w-96 h-96
            bg-cyan-200/20
            blur-3xl
            rounded-full
          " />

        </div>

        <div className="
          relative
          max-w-7xl
          mx-auto
          px-6
          py-10
        ">

          {/* ========================================= */}
          {/* Header */}
          {/* ========================================= */}
          <div className="
            flex flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between
            gap-8
            mb-10
          ">

            <div>

              <div className="
                inline-flex items-center gap-2
                bg-blue-100 text-blue-700
                px-5 py-2 rounded-full
                text-sm font-semibold
                shadow-sm mb-5
              ">
                🔐 Secure Access Governance
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                Access Requests
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Review, approve, and manage
                cross-clinic patient record access
                requests securely and efficiently.
              </p>

            </div>

            <div className="
              bg-white/70 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-lg
              px-8 py-6
              min-w-[280px]
            ">

              <div className="
                text-sm text-slate-500 mb-2
              ">
                Pending Reviews
              </div>

              <div className="
                text-5xl font-black
                text-slate-900
              ">
                {
                  requests.filter(
                    (r) => r.status === "pending"
                  ).length
                }
              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Stats */}
          {/* ========================================= */}
          <div className="
            grid grid-cols-1
            md:grid-cols-3
            gap-6 mb-10
          ">

            {/* Total */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
            ">

              <div className="
                flex items-center justify-between
                mb-6
              ">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                  text-3xl
                ">
                  📂
                </div>

                <div className="
                  text-xs
                  bg-blue-50
                  text-blue-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Total
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {requests.length}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Access requests
              </p>

            </div>

            {/* Approved */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
            ">

              <div className="
                flex items-center justify-between
                mb-6
              ">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-emerald-100
                  flex items-center justify-center
                  text-3xl
                ">
                  ✅
                </div>

                <div className="
                  text-xs
                  bg-emerald-50
                  text-emerald-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Approved
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {
                  requests.filter(
                    (r) => r.status === "approved"
                  ).length
                }
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Approved access
              </p>

            </div>

            {/* Rejected */}
            <div className="
              relative overflow-hidden
              bg-gradient-to-br
              from-blue-600 via-indigo-600 to-violet-700
              rounded-3xl
              p-6
              shadow-2xl
              text-white
            ">

              <div className="
                absolute top-0 right-0
                w-48 h-48
                bg-white/10
                blur-3xl
                rounded-full
              " />

              <div className="relative">

                <div className="
                  flex items-center justify-between
                  mb-6
                ">

                  <div className="
                    w-16 h-16
                    rounded-2xl
                    bg-white/10
                    backdrop-blur-md
                    flex items-center justify-center
                    text-3xl
                  ">
                    🚫
                  </div>

                  <div className="
                    text-xs
                    bg-white/10
                    px-3 py-1
                    rounded-full
                    font-semibold
                  ">
                    Rejected
                  </div>

                </div>

                <div className="
                  text-5xl font-black mb-2
                ">
                  {
                    requests.filter(
                      (r) => r.status === "rejected"
                    ).length
                  }
                </div>

                <p className="
                  text-blue-100 text-sm
                ">
                  Declined requests
                </p>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Filters */}
          {/* ========================================= */}
          <div className="
            bg-white/80 backdrop-blur-xl
            border border-white/60
            rounded-3xl
            shadow-lg
            p-6
            mb-10
          ">

            <div className="
              flex flex-col lg:flex-row
              gap-4
            ">

              {/* Search */}
              <div className="
                relative flex-1
              ">

                <input
                  type="text"
                  placeholder="Search patient, clinic, requester..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    px-6 py-5
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50/70
                    focus:outline-none
                    focus:ring-4 focus:ring-blue-100
                    focus:border-blue-400
                    transition-all
                  "
                />

                <div className="
                  absolute right-5 top-1/2
                  -translate-y-1/2
                  text-slate-400 text-xl
                ">
                  🔍
                </div>

              </div>

              {/* Filter Buttons */}
              <div className="
                flex gap-3 flex-wrap
              ">

                {["pending", "approved", "rejected"].map((s) => (

                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`
                      px-6 py-4
                      rounded-2xl
                      font-semibold
                      capitalize
                      transition-all duration-300
                      ${
                        filter === s
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                      }
                    `}
                  >
                    {s}
                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Table */}
          {/* ========================================= */}
          <div className="
            bg-white/80 backdrop-blur-xl
            border border-white/60
            rounded-3xl
            shadow-2xl
            overflow-hidden
          ">

            {/* Header */}
            <div className="
              px-8 py-6
              border-b border-slate-100
              flex flex-col md:flex-row
              md:items-center md:justify-between
              gap-4
            ">

              <div>

                <h2 className="
                  text-2xl font-bold
                  text-slate-900
                ">
                  Access Approval Queue
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  Secure patient record sharing workflow
                </p>

              </div>

              <div className="
                bg-slate-100
                text-slate-700
                px-4 py-2
                rounded-full
                text-sm font-semibold
              ">
                {filteredRequests.length} Results
              </div>

            </div>

            {/* Empty State */}
            {!loading && filteredRequests.length === 0 ? (

              <div className="
                py-24 text-center px-6
              ">

                <div className="
                  text-7xl mb-6
                ">
                  📭
                </div>

                <h3 className="
                  text-3xl font-bold
                  text-slate-800 mb-4
                ">
                  No Requests Found
                </h3>

                <p className="
                  text-slate-500
                  max-w-xl mx-auto
                  leading-relaxed
                ">
                  No access requests match the
                  selected filters.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="
                    bg-slate-50
                    border-b border-slate-100
                  ">

                    <tr className="text-left">

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        ID
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Record
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Patient
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Clinic
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Requested By
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Status
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {loading ? (

                      <tr>

                        <td
                          colSpan="7"
                          className="
                            text-center py-20
                            text-slate-500
                          "
                        >
                          Loading Requests...
                        </td>

                      </tr>

                    ) : (

                      filteredRequests.map((r) => (

                        <tr
                          key={r.id}
                          className="
                            border-b border-slate-100
                            hover:bg-blue-50/40
                            transition-all
                          "
                        >

                          {/* ID */}
                          <td className="
                            px-8 py-6
                          ">

                            <code className="
                              text-xs font-mono
                              bg-slate-100 text-slate-700
                              px-3 py-2
                              rounded-xl
                            ">
                              #{r.id}
                            </code>

                          </td>

                          {/* Record */}
                          <td className="
                            px-8 py-6
                          ">

                            <div className="
                              flex items-center gap-4
                            ">

                              <div className="
                                w-12 h-12
                                rounded-2xl
                                bg-gradient-to-br
                                from-blue-500 to-indigo-600
                                text-white
                                flex items-center justify-center
                                shadow-lg
                                text-xl
                              ">
                                📄
                              </div>

                              <div>

                                <div className="
                                  font-semibold
                                  text-slate-800
                                ">
                                  {r.record_title}
                                </div>

                                <div className="
                                  text-sm text-slate-500
                                ">
                                  Medical Record
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* Patient */}
                          <td className="
                            px-8 py-6
                            font-medium text-slate-700
                          ">
                            {r.patient_name}
                          </td>

                          {/* Clinic */}
                          <td className="
                            px-8 py-6
                            text-slate-600
                          ">
                            {r.clinic_name}
                          </td>

                          {/* Requested By */}
                          <td className="
                            px-8 py-6
                            text-slate-600
                          ">
                            {r.requested_by}
                          </td>

                          {/* Status */}
                          <td className="
                            px-8 py-6
                          ">

                            <span
                              className={`
                                inline-flex items-center
                                px-4 py-2
                                rounded-full
                                text-xs font-bold
                                ${getStatusStyle(r.status)}
                              `}
                            >
                              {r.status}
                            </span>

                          </td>

                          {/* Actions */}
                          <td className="
                            px-8 py-6
                          ">

                            {r.status === "pending" ? (

                              <div className="
                                flex items-center gap-3
                              ">

                                <button
                                  onClick={() =>
                                    handleAction(
                                      r.id,
                                      "approve"
                                    )
                                  }
                                  disabled={
                                    processingId === r.id
                                  }
                                  className="
                                    px-4 py-2
                                    rounded-xl
                                    bg-emerald-600
                                    hover:bg-emerald-700
                                    text-white
                                    text-sm font-semibold
                                    shadow-md
                                    transition-all
                                    disabled:opacity-50
                                  "
                                >
                                  {processingId === r.id
                                    ? "..."
                                    : "Approve"}
                                </button>

                                <button
                                  onClick={() =>
                                    handleAction(
                                      r.id,
                                      "reject"
                                    )
                                  }
                                  disabled={
                                    processingId === r.id
                                  }
                                  className="
                                    px-4 py-2
                                    rounded-xl
                                    bg-red-600
                                    hover:bg-red-700
                                    text-white
                                    text-sm font-semibold
                                    shadow-md
                                    transition-all
                                    disabled:opacity-50
                                  "
                                >
                                  Reject
                                </button>

                              </div>

                            ) : (

                              <span className="
                                text-slate-400 text-sm
                              ">
                                Completed
                              </span>

                            )}

                          </td>

                        </tr>

                      ))

                    )}

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