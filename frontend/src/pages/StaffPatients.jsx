import { useEffect, useMemo, useState } from "react";

import StaffNavbar from "../components/StaffNavbar";

export default function StaffPatients() {

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // =========================================
  // Fetch Patients
  // =========================================
  useEffect(() => {

    const fetchPatients = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://127.0.0.1:8000/patients/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setPatients(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Error fetching patients:",
          error
        );

        setPatients([]);

      } finally {

        setLoading(false);

      }
    };

    fetchPatients();

  }, []);

  // =========================================
  // Search Filter
  // =========================================
  const filteredPatients = useMemo(() => {

    return patients.filter((p) => {

      return (
        p.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

    });

  }, [patients, search]);

  // =========================================
  // Gender Style
  // =========================================
  const getGenderStyle = (gender) => {

    const value = gender?.toLowerCase();

    if (value === "male") {

      return "bg-blue-100 text-blue-700";
    }

    if (value === "female") {

      return "bg-pink-100 text-pink-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <>
      <StaffNavbar />

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
                🧑‍⚕️ Patient Directory
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                Patients
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Securely access patient information
                with read-only permissions and
                real-time clinic synchronization.
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
                Access Mode
              </div>

              <div className="
                flex items-center gap-3
              ">

                <div className="
                  w-4 h-4
                  rounded-full
                  bg-emerald-500
                  animate-pulse
                " />

                <span className="
                  text-2xl font-black
                  text-slate-900
                ">
                  Read Only
                </span>

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
                  👥
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
                {loading ? "..." : patients.length}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Registered patients
              </p>

            </div>

            {/* Search Stats */}
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
                  🔎
                </div>

                <div className="
                  text-xs
                  bg-emerald-50
                  text-emerald-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Search
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading
                  ? "..."
                  : search.trim()
                  ? filteredPatients.length
                  : 0}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                {search.trim()
                  ? "Search matches"
                  : "Type to search"}
              </p>

            </div>

            {/* Permission */}
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
                    🔐
                  </div>

                  <div className="
                    text-xs
                    bg-white/10
                    px-3 py-1
                    rounded-full
                    font-semibold
                  ">
                    Secure
                  </div>

                </div>

                <div className="
                  text-4xl font-black mb-2
                ">
                  Protected
                </div>

                <p className="
                  text-blue-100 text-sm
                ">
                  Read-only patient access
                </p>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Search */}
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
              relative
            ">

              <input
                type="text"
                placeholder="Search patient by name..."
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

            {/* Table Header */}
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
                  Patient Records
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  Secure patient overview
                </p>

              </div>

              <div className="
                bg-slate-100
                text-slate-700
                px-4 py-2
                rounded-full
                text-sm font-semibold
              ">
                {search.trim()
                  ? `${filteredPatients.length} Results`
                  : `${patients.length} Patients`}
              </div>

            </div>

            {/* Empty State */}
            {!loading && filteredPatients.length === 0 ? (

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
                  No Patients Found
                </h3>

                <p className="
                  text-slate-500
                  max-w-xl mx-auto
                ">
                  No patient records match
                  your current search.
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
                        Patient ID
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Patient Name
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Age
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Gender
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Last Visit
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {loading ? (

                      <tr>

                        <td
                          colSpan="5"
                          className="
                            text-center py-20
                            text-slate-500
                          "
                        >
                          Loading Patients...
                        </td>

                      </tr>

                    ) : (

                      filteredPatients.map((patient) => (

                        <tr
                          key={patient.id}
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
                              #{patient.id}
                            </code>

                          </td>

                          {/* Name */}
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
                                font-bold
                              ">
                                {patient.name
                                  ?.charAt(0)
                                  ?.toUpperCase() || "P"}
                              </div>

                              <div>

                                <div className="
                                  font-semibold
                                  text-slate-800
                                ">
                                  {patient.name}
                                </div>

                                <div className="
                                  text-sm text-slate-500
                                ">
                                  Patient Record
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* Age */}
                          <td className="
                            px-8 py-6
                            text-slate-700 font-medium
                          ">
                            {patient.age || "-"}
                          </td>

                          {/* Gender */}
                          <td className="
                            px-8 py-6
                          ">

                            <span
                              className={`
                                inline-flex items-center
                                px-4 py-2
                                rounded-full
                                text-xs font-bold
                                ${getGenderStyle(
                                  patient.gender
                                )}
                              `}
                            >
                              {patient.gender || "N/A"}
                            </span>

                          </td>

                          {/* Date */}
                          <td className="
                            px-8 py-6
                            text-slate-600
                          ">

                            {patient.created_at
                              ? new Date(
                                  patient.created_at
                                ).toLocaleDateString()
                              : "-"}

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