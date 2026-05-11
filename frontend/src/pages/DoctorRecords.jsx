import { useEffect, useMemo, useState } from "react";

import DoctorNavbar from "../components/DoctorNavbar";
import ChatbotWidget from "../components/ChatbotWidget";

export default function DoctorRecords() {

  const [records, setRecords] = useState([]);

  const [patients, setPatients] = useState([]);

  const [clinics, setClinics] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [selectedClinic, setSelectedClinic] = useState("");

  const [sending, setSending] = useState(false);

  const token = localStorage.getItem("token");

  // =========================================
  // Initial Fetch
  // =========================================
  useEffect(() => {

    fetchAllData();

  }, []);

  const fetchAllData = async () => {

    try {

      await Promise.all([
        fetchRecords(),
        fetchPatients(),
        fetchClinics(),
      ]);

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // Fetch Records
  // =========================================
  const fetchRecords = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/records/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setRecords(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Records Error:", error);

      setRecords([]);

    }
  };

  // =========================================
  // Fetch Patients
  // =========================================
  const fetchPatients = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/patients/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setPatients(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Patients Error:", error);

      setPatients([]);

    }
  };

  // =========================================
  // Fetch Clinics
  // =========================================
  const fetchClinics = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/clinics/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setClinics(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Clinics Error:", error);

      setClinics([]);

    }
  };

  // =========================================
  // Patient Name
  // =========================================
  const getPatientName = (id) => {

    const patient = patients.find(
      (p) => p.id === id
    );

    return patient ? patient.name : "Unknown";
  };

  // =========================================
  // Filtered Records
  // =========================================
  const filteredRecords = useMemo(() => {

    return records.filter((record) =>

      getPatientName(record.patient_id)
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [records, search, patients]);

  // =========================================
  // Record Type Style
  // =========================================
  const getTypeStyle = (type) => {

    if (type === "lab") {

      return "bg-blue-100 text-blue-700";
    }

    if (type === "report") {

      return "bg-emerald-100 text-emerald-700";
    }

    return "bg-violet-100 text-violet-700";
  };

  // =========================================
  // Send Access Request
  // =========================================
  const sendRequest = async () => {

    if (!selectedClinic) {

      alert("Please select a clinic");

      return;
    }

    try {

      setSending(true);

      await fetch(
        `http://127.0.0.1:8000/access/request?record_id=${selectedRecord}&to_clinic_id=${selectedClinic}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Access request sent successfully");

      setSelectedRecord(null);

      setSelectedClinic("");

    } catch (error) {

      console.error("Send Request Error:", error);

      alert("Failed to send request");

    } finally {

      setSending(false);

    }
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
                📂 Medical Record Repository
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                Medical Records
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Securely access, review, share,
                and manage healthcare reports,
                diagnoses, prescriptions, and
                clinical documents.
              </p>

            </div>

            {/* Status */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              shadow-2xl
              rounded-3xl
              px-8 py-7
              min-w-[240px]
            ">

              <div className="
                text-sm text-slate-500 mb-3
              ">
                Healthcare Security
              </div>

              <div className="
                flex items-center gap-3
              ">

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
                  Protected
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
                  Results
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
              ">
                Records matching search
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
                  Encrypted
                </div>

                <p className="
                  text-blue-100 text-sm
                ">
                  Secure healthcare infrastructure
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

            <div className="relative">

              <input
                type="text"
                placeholder="Search by patient name..."
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
          {/* Records Table */}
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
                  Patient Healthcare Records
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  Secure healthcare documentation system
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

            {/* Empty */}
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
                  No healthcare records match the
                  current search. Uploaded records
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
                        ID
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
                        Title
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
                        File
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredRecords.map((record) => (

                      <tr
                        key={record.id}
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
                            {record.id}
                          </code>

                        </td>

                        {/* Patient */}
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
                              font-bold
                              shadow-lg
                            ">
                              {getPatientName(record.patient_id)
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>

                              <div className="
                                font-semibold
                                text-slate-800
                              ">
                                {getPatientName(record.patient_id)}
                              </div>

                              <div className="
                                text-sm text-slate-500
                              ">
                                Healthcare Patient
                              </div>

                            </div>

                          </div>

                        </td>

                        {/* Title */}
                        <td className="
                          px-8 py-6
                          font-medium text-slate-700
                        ">
                          {record.title}
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
                            {record.record_type}
                          </span>

                        </td>

                        {/* File */}
                        <td className="
                          px-8 py-6
                        ">

                          <a
                            href={`http://127.0.0.1:8000/${record.file_path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              inline-flex items-center
                              gap-2
                              px-4 py-2
                              rounded-xl
                              bg-blue-100
                              hover:bg-blue-200
                              text-blue-700
                              text-sm font-semibold
                              transition-all
                            "
                          >
                            📄 View File
                          </a>

                        </td>

                        {/* Share */}
                        <td className="
                          px-8 py-6
                        ">

                          <button
                            onClick={() =>
                              setSelectedRecord(record.id)
                            }
                            className="
                              px-5 py-2
                              rounded-xl
                              bg-gradient-to-r
                              from-blue-600 to-indigo-600
                              hover:from-blue-700 hover:to-indigo-700
                              text-white
                              text-sm font-semibold
                              shadow-md
                              hover:shadow-lg
                              transition-all
                            "
                          >
                            Share
                          </button>

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

      {/* ========================================= */}
      {/* Share Modal */}
      {/* ========================================= */}
      {selectedRecord && (

        <div className="
          fixed inset-0 z-50
          bg-black/50 backdrop-blur-md
          flex items-center justify-center
          px-4
        ">

          <div className="
            w-full max-w-lg
            bg-white/95 backdrop-blur-xl
            border border-white/60
            rounded-3xl
            shadow-2xl
            p-8
            animate-in fade-in zoom-in duration-300
          ">

            {/* Header */}
            <div className="
              flex items-center justify-between
              mb-8
            ">

              <div>

                <h2 className="
                  text-3xl font-black
                  text-slate-900
                ">
                  Share Medical Record
                </h2>

                <p className="
                  text-slate-500 mt-2
                ">
                  Send secure access request to another clinic
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedRecord(null)
                }
                className="
                  w-11 h-11
                  rounded-2xl
                  bg-slate-100
                  hover:bg-red-100
                  hover:text-red-600
                  transition-all
                "
              >
                ✕
              </button>

            </div>

            {/* Select Clinic */}
            <select
              value={selectedClinic}
              onChange={(e) =>
                setSelectedClinic(e.target.value)
              }
              className="
                w-full
                px-5 py-4
                rounded-2xl
                border border-slate-200
                bg-slate-50/70
                focus:outline-none
                focus:ring-4 focus:ring-blue-100
                focus:border-blue-400
                transition-all
                mb-8
              "
            >

              <option value="">
                Select Clinic
              </option>

              {clinics.map((clinic) => (

                <option
                  key={clinic.id}
                  value={clinic.id}
                >
                  {clinic.name}
                </option>

              ))}

            </select>

            {/* Footer */}
            <div className="
              flex justify-end gap-4
            ">

              <button
                onClick={() =>
                  setSelectedRecord(null)
                }
                className="
                  px-6 py-3
                  rounded-2xl
                  border border-slate-200
                  hover:bg-slate-100
                  transition-all
                  font-medium
                "
              >
                Cancel
              </button>

              <button
                onClick={sendRequest}
                disabled={sending}
                className="
                  px-7 py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600 to-indigo-600
                  hover:from-blue-700 hover:to-indigo-700
                  text-white
                  shadow-lg
                  transition-all
                  font-semibold
                  disabled:opacity-60
                "
              >
                {sending
                  ? "Sending..."
                  : "Send Request"}
              </button>

            </div>

          </div>

        </div>

      )}

      <ChatbotWidget />
    </>
  );
}