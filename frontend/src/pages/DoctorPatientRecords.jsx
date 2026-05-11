import { useEffect, useMemo, useState } from "react";

import DoctorNavbar from "../components/DoctorNavbar";

export default function DoctorPatientRecords() {

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filterPatientId, setFilterPatientId] = useState("");

  const [filterType, setFilterType] = useState("");

  // =========================================
  // Fetch Records
  // =========================================
  useEffect(() => {

    const fetchRecords = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://127.0.0.1:8000/records/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (Array.isArray(data)) {

          setRecords(data);

        } else {

          setRecords([]);

        }

      } catch (error) {

        console.error("Records Fetch Error:", error);

        setRecords([]);

      } finally {

        setLoading(false);

      }
    };

    fetchRecords();

  }, []);

  // =========================================
  // Filtered Records
  // =========================================
  const filteredRecords = useMemo(() => {

    return records.filter((record) => {

      const patientMatch =
        filterPatientId === "" ||

        (record.patient_id || "")
          .toString()
          .toLowerCase()
          .includes(filterPatientId.toLowerCase());

      const typeMatch =
        filterType === "" ||
        record.record_type === filterType;

      return patientMatch && typeMatch;

    });

  }, [records, filterPatientId, filterType]);

  // =========================================
  // Badge Styles
  // =========================================
  const getTypeStyle = (type) => {

    if (type === "Lab Report") {

      return "bg-blue-100 text-blue-700";

    }

    if (type === "Diagnosis") {

      return "bg-violet-100 text-violet-700";

    }

    if (type === "Prescription") {

      return "bg-emerald-100 text-emerald-700";

    }

    return "bg-slate-100 text-slate-700";
  };

  return (
    <>
      <DoctorNavbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

        {/* Background Blur */}
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

              <div className="
                inline-flex items-center gap-2
                bg-blue-100 text-blue-700
                px-5 py-2 rounded-full
                text-sm font-semibold
                shadow-sm mb-5
              ">
                📂 Healthcare Records
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                Patient Records
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Access and manage patient medical records,
                diagnoses, prescriptions, and healthcare
                reports securely through MedSec.
              </p>

            </div>

            {/* Access Status */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              shadow-2xl
              rounded-3xl
              px-8 py-7
              min-w-[240px]
            ">

              <div className="text-sm text-slate-500 mb-3">
                Record Access
              </div>

              <div className="flex items-center gap-3">

                <div className="
                  w-3 h-3
                  bg-emerald-500
                  rounded-full
                  animate-pulse
                " />

                <span className="
                  font-bold
                  text-emerald-600
                  text-2xl
                ">
                  Authorized
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

            {/* Total Records */}
            <div className="
              group
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all duration-300
            ">

              <div className="
                flex items-start justify-between
                mb-6
              ">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                  text-3xl
                ">
                  📄
                </div>

                <div className="
                  text-xs
                  bg-blue-50
                  text-blue-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Records
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "--" : records.length}
              </div>

              <p className="
                text-slate-500 text-sm
                leading-relaxed
              ">
                Total uploaded medical records
              </p>

            </div>

            {/* Filtered */}
            <div className="
              group
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all duration-300
            ">

              <div className="
                flex items-start justify-between
                mb-6
              ">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-violet-100
                  flex items-center justify-center
                  text-3xl
                ">
                  🔎
                </div>

                <div className="
                  text-xs
                  bg-violet-50
                  text-violet-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Filtered
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "--" : filteredRecords.length}
              </div>

              <p className="
                text-slate-500 text-sm
                leading-relaxed
              ">
                Records matching current filters
              </p>

            </div>

            {/* Security */}
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
                  flex items-start justify-between
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
                    Security
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
                  Encrypted healthcare data access
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

              {/* Patient ID */}
              <input
                type="text"
                placeholder="Search by Patient ID..."
                value={filterPatientId}
                onChange={(e) =>
                  setFilterPatientId(e.target.value)
                }
                className="
                  flex-1
                  px-5 py-4
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50/70
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-400
                  transition-all
                "
              />

              {/* Type */}
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value)
                }
                className="
                  px-5 py-4
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50/70
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-400
                  transition-all
                  text-slate-700
                  font-medium
                "
              >

                <option value="">
                  All Types
                </option>

                <option value="Prescription">
                  Prescription
                </option>

                <option value="Diagnosis">
                  Diagnosis
                </option>

                <option value="Lab Report">
                  Lab Report
                </option>

              </select>

            </div>

          </div>

          {/* ========================================= */}
          {/* Records Table */}
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
                  Medical Record Repository
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  Secure healthcare documentation management
                </p>

              </div>

              <div className="
                bg-slate-100
                text-slate-700
                px-4 py-2
                rounded-full
                text-sm font-semibold
              ">
                Live Data
              </div>

            </div>

            {/* Empty State */}
            {!loading && filteredRecords.length === 0 ? (

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
                  No Records Found
                </h3>

                <p className="
                  text-slate-500
                  max-w-xl mx-auto
                  leading-relaxed
                ">
                  No medical records match the current
                  search criteria. Uploaded records
                  will appear here automatically.
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
                        Record ID
                      </th>

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
                        Record Title
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Type
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredRecords.map((record, index) => (

                      <tr
                        key={index}
                        className="
                          border-b border-slate-100
                          hover:bg-blue-50/40
                          transition-all
                        "
                      >

                        {/* Record ID */}
                        <td className="
                          px-8 py-6
                        ">

                          <code className="
                            text-xs font-mono
                            bg-slate-100 text-slate-700
                            px-3 py-2
                            rounded-xl
                          ">
                            {record.id || "N/A"}
                          </code>

                        </td>

                        {/* Patient ID */}
                        <td className="
                          px-8 py-6
                          font-semibold
                          text-slate-800
                        ">
                          {record.patient_id || "N/A"}
                        </td>

                        {/* Title */}
                        <td className="
                          px-8 py-6
                        ">

                          <div>

                            <div className="
                              font-semibold
                              text-slate-800
                            ">
                              {record.title || "Untitled Record"}
                            </div>

                            <div className="
                              text-sm text-slate-500 mt-1
                            ">
                              Healthcare document
                            </div>

                          </div>

                        </td>

                        {/* Type */}
                        <td className="
                          px-8 py-6
                        ">

                          <span
                            className={`
                              inline-flex items-center
                              px-4 py-2
                              rounded-full
                              text-xs font-bold
                              ${getTypeStyle(record.record_type)}
                            `}
                          >
                            {record.record_type || "Unknown"}
                          </span>

                        </td>

                        {/* Date */}
                        <td className="
                          px-8 py-6
                          text-slate-600
                          whitespace-nowrap
                        ">
                          {record.created_at
                            ? new Date(
                                record.created_at
                              ).toLocaleDateString()
                            : "N/A"}
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