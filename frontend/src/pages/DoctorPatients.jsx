import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorNavbar from "../components/DoctorNavbar";

export default function DoctorPatients() {

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const [creating, setCreating] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  // =========================================
  // Fetch Patients
  // =========================================
  useEffect(() => {

    fetchPatients();

  }, []);

  const fetchPatients = async () => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/patients/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {

        localStorage.clear();

        navigate("/login");

        return;
      }

      const data = await response.json();

      setPatients(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Patients Error:", error);

      setPatients([]);

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // Create Patient
  // =========================================
  const createPatient = async () => {

    const token = localStorage.getItem("token");

    try {

      setCreating(true);

      const response = await fetch(
        "http://127.0.0.1:8000/patients/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newPatient.name,
            age: parseInt(newPatient.age),
            gender: newPatient.gender,
            phone: newPatient.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.detail || "Failed to create patient");

        return;
      }

      setShowModal(false);

      setNewPatient({
        name: "",
        age: "",
        gender: "",
        phone: "",
      });

      fetchPatients();

    } catch (error) {

      console.error("Create Patient Error:", error);

      alert("Network Error");

    } finally {

      setCreating(false);

    }
  };

  // =========================================
  // Filter Patients
  // =========================================
  const filteredPatients = useMemo(() => {

    return patients.filter((patient) =>
      patient.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [patients, search]);

  // =========================================
  // Gender Style
  // =========================================
  const getGenderStyle = (gender) => {

    if (gender === "Male") {

      return "bg-blue-100 text-blue-700";
    }

    if (gender === "Female") {

      return "bg-pink-100 text-pink-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  return (
    <>
      <DoctorNavbar />

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

              <div className="
                inline-flex items-center gap-2
                bg-blue-100 text-blue-700
                px-5 py-2 rounded-full
                text-sm font-semibold
                shadow-sm mb-5
              ">
                🧑‍⚕️ Patient Management System
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
                Create, manage, and monitor patient
                information securely with enterprise-grade
                healthcare infrastructure powered by MedSec.
              </p>

            </div>

            {/* Add Patient Button */}
            <button
              onClick={() => setShowModal(true)}
              className="
                group
                relative overflow-hidden
                bg-gradient-to-r
                from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                text-white
                px-7 py-4
                rounded-2xl
                shadow-xl
                hover:shadow-2xl
                transition-all duration-300
                font-semibold
                text-lg
              "
            >

              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">
                  +
                </span>

                Add Patient
              </span>

            </button>

          </div>

          {/* ========================================= */}
          {/* Stats */}
          {/* ========================================= */}
          <div className="
            grid grid-cols-1
            md:grid-cols-3
            gap-6 mb-10
          ">

            {/* Total Patients */}
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
                  Patients
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "--" : patients.length}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Registered healthcare patients
              </p>

            </div>

            {/* Search Results */}
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
                  Search
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "--" : filteredPatients.length}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Patients matching search
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
                    Protected
                  </div>

                </div>

                <div className="
                  text-4xl font-black mb-2
                ">
                  Secure
                </div>

                <p className="
                  text-blue-100 text-sm
                ">
                  Healthcare data encryption enabled
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
                  text-slate-700
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
          {/* Patients Table */}
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
                  Patient Registry
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  Secure healthcare patient management
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
                  leading-relaxed
                ">
                  No patients match the current search.
                  Newly created patients will appear here
                  automatically.
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
                        Phone
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
                              {patient.id}
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
                                {patient.name
                                  ?.charAt(0)
                                  ?.toUpperCase()}
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
                                  Registered Patient
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* Age */}
                          <td className="
                            px-8 py-6
                            text-slate-700
                            font-medium
                          ">
                            {patient.age}
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
                                ${getGenderStyle(patient.gender)}
                              `}
                            >
                              {patient.gender}
                            </span>

                          </td>

                          {/* Phone */}
                          <td className="
                            px-8 py-6
                            text-slate-600
                          ">
                            {patient.phone}
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* ========================================= */}
          {/* Create Patient Modal */}
          {/* ========================================= */}
          {showModal && (

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

                {/* Modal Header */}
                <div className="
                  flex items-center justify-between
                  mb-8
                ">

                  <div>

                    <h2 className="
                      text-3xl font-black
                      text-slate-900
                    ">
                      Create Patient
                    </h2>

                    <p className="
                      text-slate-500 mt-2
                    ">
                      Register a new healthcare patient
                    </p>

                  </div>

                  <button
                    onClick={() => setShowModal(false)}
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

                {/* Form */}
                <div className="space-y-5">

                  {/* Name */}
                  <input
                    placeholder="Patient Name"
                    value={newPatient.name}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        name: e.target.value,
                      })
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
                    "
                  />

                  {/* Age */}
                  <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        age: e.target.value,
                      })
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
                    "
                  />

                  {/* Gender */}
                  <select
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        gender: e.target.value,
                      })
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
                    "
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                  </select>

                  {/* Phone */}
                  <input
                    placeholder="Phone Number"
                    value={newPatient.phone}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        phone: e.target.value,
                      })
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
                    "
                  />

                </div>

                {/* Footer */}
                <div className="
                  flex justify-end gap-4
                  mt-8
                ">

                  <button
                    onClick={() => setShowModal(false)}
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
                    onClick={createPatient}
                    disabled={creating}
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
                    {creating
                      ? "Creating..."
                      : "Create Patient"}
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>
    </>
  );
}