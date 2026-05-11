import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminClinics() {
  const [organizations, setOrganizations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  // =========================================
  // Fetch Clinics + Organizations
  // =========================================
  useEffect(() => {
    fetchClinics();
    fetchOrganizations();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/clinics/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) return;

      setClinics(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
      setClinics([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/organizations/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) return;

      setOrganizations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    }
  };

  // =========================================
  // Create Clinic
  // =========================================
  const createClinic = async () => {
    try {
      if (!selectedClinic.organization_id) {
        alert("Please select organization");
        return;
      }

      if (!selectedClinic.name?.trim()) {
        alert("Please enter clinic name");
        return;
      }

      if (!selectedClinic.location?.trim()) {
        alert("Please enter location");
        return;
      }

      setSaving(true);

      const response = await fetch(
        "http://127.0.0.1:8000/clinics/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            organization_id: Number(selectedClinic.organization_id),
            name: selectedClinic.name,
            location: selectedClinic.location,
          }),
        }
      );

      const data = await response.json();

      console.log("CREATE CLINIC RESPONSE:", data);

      if (!response.ok) {
        alert(JSON.stringify(data));
        return;
      }

      alert("✅ Clinic created successfully");

      setSelectedClinic(null);
      setIsAddMode(false);

      fetchClinics();
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // Filter Clinics
  // =========================================
  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const matchesStatus =
        filterStatus === "" || clinic.status === filterStatus;

      const matchesSearch =
        clinic.name?.toLowerCase().includes(search.toLowerCase()) ||
        clinic.location?.toLowerCase().includes(search.toLowerCase()) ||
        clinic.organization_code
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [clinics, filterStatus, search]);

  // =========================================
  // Status Style
  // =========================================
  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-100 text-emerald-700";
    }

    return "bg-red-100 text-red-600";
  };

  return (
    <>
      <AdminNavbar />

      <main
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-white
          to-blue-50
          overflow-hidden
        "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div
            className="
              absolute top-0 left-0
              w-96 h-96
              bg-blue-200/20
              blur-3xl
              rounded-full
            "
          />

          <div
            className="
              absolute bottom-0 right-0
              w-96 h-96
              bg-cyan-200/20
              blur-3xl
              rounded-full
            "
          />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">

          {/* ========================================= */}
          {/* Header */}
          {/* ========================================= */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-10">

            <div>

              <div
                className="
                  inline-flex items-center gap-2
                  bg-blue-100
                  text-blue-700
                  px-5 py-2
                  rounded-full
                  text-sm font-semibold
                  shadow-sm mb-5
                "
              >
                🏥 Healthcare Organization Control
              </div>

              <h1
                className="
                  text-5xl md:text-6xl
                  font-black
                  tracking-tight
                  text-slate-900
                  leading-tight mb-5
                "
              >
                Clinic Management
              </h1>

              <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                Manage healthcare organizations,
                monitor clinic operations,
                and maintain secure administration
                across the MedSec ecosystem.
              </p>

            </div>

            {/* Add Button */}
            <button
              onClick={() => {
                setSelectedClinic({
                  organization_id: "",
                  name: "",
                  location: "",
                  status: "Active",
                });

                setIsAddMode(true);
              }}
              className="
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                text-white
                px-7 py-4
                rounded-2xl
                shadow-xl
                hover:shadow-2xl
                transition-all
                duration-300
                font-semibold
                text-lg
              "
            >
              + Add Clinic
            </button>

          </div>

          {/* ========================================= */}
          {/* Stats */}
          {/* ========================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {/* Total */}
            <div
              className="
                bg-white/80
                backdrop-blur-xl
                border border-white/60
                rounded-3xl
                p-6
                shadow-lg
              "
            >
              <div className="flex justify-between mb-6">

                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-blue-100
                    flex items-center justify-center
                    text-3xl
                  "
                >
                  🏥
                </div>

                <div
                  className="
                    text-xs
                    bg-blue-50
                    text-blue-700
                    px-3 py-1
                    rounded-full
                    font-semibold
                  "
                >
                  Clinics
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {clinics.length}
              </div>

              <p className="text-slate-500 text-sm">
                Registered healthcare clinics
              </p>

            </div>

            {/* Active */}
            <div
              className="
                bg-white/80
                backdrop-blur-xl
                border border-white/60
                rounded-3xl
                p-6
                shadow-lg
              "
            >
              <div className="flex justify-between mb-6">

                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-emerald-100
                    flex items-center justify-center
                    text-3xl
                  "
                >
                  ✅
                </div>

                <div
                  className="
                    text-xs
                    bg-emerald-50
                    text-emerald-700
                    px-3 py-1
                    rounded-full
                    font-semibold
                  "
                >
                  Active
                </div>

              </div>

              <div className="text-5xl font-black text-slate-900 mb-2">
                {
                  clinics.filter((c) => c.status === "Active").length
                }
              </div>

              <p className="text-slate-500 text-sm">
                Operational clinics
              </p>

            </div>

            {/* Inactive */}
            <div
              className="
                bg-gradient-to-br
                from-blue-600
                via-indigo-600
                to-violet-700
                rounded-3xl
                p-6
                shadow-2xl
                text-white
              "
            >
              <div className="flex justify-between mb-6">

                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-white/10
                    flex items-center justify-center
                    text-3xl
                  "
                >
                  ⚠️
                </div>

                <div
                  className="
                    text-xs
                    bg-white/10
                    px-3 py-1
                    rounded-full
                    font-semibold
                  "
                >
                  Inactive
                </div>

              </div>

              <div className="text-5xl font-black mb-2">
                {
                  clinics.filter((c) => c.status !== "Active").length
                }
              </div>

              <p className="text-blue-100 text-sm">
                Clinics requiring attention
              </p>

            </div>

          </div>

          {/* ========================================= */}
          {/* Filters */}
          {/* ========================================= */}
          <div
            className="
              bg-white/80
              backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-lg
              p-6
              mb-10
            "
          >
            <div className="flex flex-col lg:flex-row gap-4">

              {/* Search */}
              <div className="relative flex-1">

                <input
                  type="text"
                  placeholder="Search clinics, location, org code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full
                    px-6 py-5
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50/70
                    focus:outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-400
                  "
                />

                <div
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-xl
                  "
                >
                  🔍
                </div>

              </div>

              {/* Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="
                  px-6 py-5
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50/70
                  min-w-[220px]
                  focus:outline-none
                  focus:ring-4
                  focus:ring-blue-100
                "
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

          </div>

          {/* ========================================= */}
          {/* Table */}
          {/* ========================================= */}
          <div
            className="
              bg-white/80
              backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-2xl
              overflow-hidden
            "
          >

            {/* Header */}
            <div
              className="
                px-8 py-6
                border-b border-slate-100
                flex justify-between items-center
              "
            >

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Registered Clinics
                </h2>

                <p className="text-slate-500 mt-1">
                  Live healthcare organization records
                </p>

              </div>

              <div
                className="
                  bg-slate-100
                  text-slate-700
                  px-4 py-2
                  rounded-full
                  text-sm font-semibold
                "
              >
                {filteredClinics.length} Clinics
              </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-600">
                      Organization
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-600">
                      Clinic
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-600">
                      Location
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredClinics.map((clinic) => (

                    <tr
                      key={clinic.id}
                      className="
                        border-b border-slate-100
                        hover:bg-blue-50/40
                      "
                    >

                      <td className="px-8 py-6">
                        <code
                          className="
                            text-xs font-mono
                            bg-slate-100
                            text-slate-700
                            px-3 py-2
                            rounded-xl
                          "
                        >
                          {clinic.organization_code}
                        </code>
                      </td>

                      <td className="px-8 py-6 font-semibold text-slate-800">
                        {clinic.name}
                      </td>

                      <td className="px-8 py-6 text-slate-700">
                        {clinic.location}
                      </td>

                      <td className="px-8 py-6">

                        <span
                          className={`
                            px-4 py-2
                            rounded-full
                            text-xs font-bold
                            ${getStatusStyle(clinic.status)}
                          `}
                        >
                          {clinic.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* MODAL */}
        {/* ========================================= */}
        {selectedClinic && (
          <div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/40 backdrop-blur-md
              px-4
            "
          >

            <div
              className="
                relative
                w-full
                max-w-2xl
                rounded-[32px]
                bg-white/95
                border border-white/30
                shadow-[0_20px_80px_rgba(59,130,246,0.15)]
                overflow-hidden
              "
            >

              {/* Glow */}
              <div
                className="
                  absolute top-0 right-0
                  w-72 h-72
                  bg-blue-100/40
                  blur-3xl
                  rounded-full
                "
              />

              <div className="relative z-10 p-10">

                {/* Header */}
                <div className="flex justify-between mb-10">

                  <div>

                    <div
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-sm font-semibold
                        mb-4
                      "
                    >
                      🏥 Clinic Management
                    </div>

                    <h2
                      className="
                        text-5xl
                        font-black
                        tracking-tight
                        text-slate-900
                        mb-2
                      "
                    >
                      Create Clinic
                    </h2>

                    <p className="text-slate-500 text-lg">
                      Manage healthcare organizations securely
                    </p>

                  </div>

                  <button
                    onClick={() => setSelectedClinic(null)}
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-slate-100
                      hover:bg-red-50
                      hover:text-red-500
                    "
                  >
                    ✕
                  </button>

                </div>

                {/* Form */}
                <div className="space-y-6">

                  {/* Organization */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                      Select Organization
                    </label>

                    <select
                      value={selectedClinic.organization_id || ""}
                      onChange={(e) =>
                        setSelectedClinic({
                          ...selectedClinic,
                          organization_id: parseInt(e.target.value),
                        })
                      }
                      className="
                        w-full
                        px-5 py-4
                        rounded-2xl
                        border border-blue-100
                        bg-blue-50/40
                        focus:outline-none
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    >

                      <option value="">
                        Choose organization
                      </option>

                      {organizations.map((org) => (
                        <option
                          key={org.id}
                          value={org.id}
                        >
                          {org.name}
                        </option>
                      ))}

                    </select>

                  </div>

                  {/* Grid */}
                  <div className="grid md:grid-cols-2 gap-5">

                    {/* Clinic Name */}
                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Clinic Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter clinic name"
                        value={selectedClinic.name || ""}
                        onChange={(e) =>
                          setSelectedClinic({
                            ...selectedClinic,
                            name: e.target.value,
                          })
                        }
                        className="
                          w-full
                          px-5 py-4
                          rounded-2xl
                          border border-blue-100
                          bg-blue-50/40
                          focus:outline-none
                          focus:ring-4
                          focus:ring-blue-100
                        "
                      />

                    </div>

                    {/* Location */}
                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Location
                      </label>

                      <input
                        type="text"
                        placeholder="Enter location"
                        value={selectedClinic.location || ""}
                        onChange={(e) =>
                          setSelectedClinic({
                            ...selectedClinic,
                            location: e.target.value,
                          })
                        }
                        className="
                          w-full
                          px-5 py-4
                          rounded-2xl
                          border border-blue-100
                          bg-blue-50/40
                          focus:outline-none
                          focus:ring-4
                          focus:ring-blue-100
                        "
                      />

                    </div>

                  </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 mt-10">

                  <button
                    onClick={() => setSelectedClinic(null)}
                    className="
                      px-6 py-3
                      rounded-2xl
                      border border-slate-200
                      bg-white
                      text-slate-700
                      font-semibold
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={createClinic}
                    disabled={saving}
                    className="
                      px-8 py-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      font-semibold
                      shadow-lg
                      hover:scale-[1.02]
                      transition-all
                    "
                  >
                    {saving ? "Saving..." : "Create Clinic"}
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </main>
    </>
  );
}