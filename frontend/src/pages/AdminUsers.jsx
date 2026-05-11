import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminUsers() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [clinics, setClinics] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [search, setSearch] = useState("");

  const [creating, setCreating] = useState(false);

  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
    clinic_id: "",
  });

  // =========================================
  // Fetch Data
  // =========================================
  useEffect(() => {

    fetchUsers();

    fetchClinics();

  }, []);

  // =========================================
  // Fetch Users
  // =========================================
  const fetchUsers = async () => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/users/",
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

      setUsers(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Users Error:", error);

      setUsers([]);

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // Fetch Clinics
  // =========================================
  const fetchClinics = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/clinics/",
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
  // Create User
  // =========================================
  const createUser = async () => {

    const token = localStorage.getItem("token");

    if (!newUser.full_name.trim()) return;

    if (!newUser.email.trim()) return;

    if (!newUser.password || newUser.password.length < 6) return;

    if (!newUser.role || !newUser.clinic_id) return;

    try {

      setCreating(true);

      const response = await fetch(
        "http://127.0.0.1:8000/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: newUser.full_name,
            email: newUser.email,
            password: newUser.password,
            role: newUser.role,
            clinic_id: Number(newUser.clinic_id),
          }),
        }
      );

      if (!response.ok) {

        alert("Failed to create user");

        return;
      }

      setShowCreateModal(false);

      setNewUser({
        full_name: "",
        email: "",
        password: "",
        role: "",
        clinic_id: "",
      });

      fetchUsers();

    } catch (error) {

      console.error("Create User Error:", error);

      alert("Network Error");

    } finally {

      setCreating(false);

    }
  };

  // =========================================
  // Filter Users
  // =========================================
  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      const fullName =
        user.full_name || "";

      const email =
        user.email || "";

      return (
        fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        email
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    });

  }, [users, search]);

  // =========================================
  // Clinic Name
  // =========================================
  const getClinicName = (id) => {

    const clinic = clinics.find(
      (c) => c.id === id
    );

    return clinic ? clinic.name : "—";
  };

  // =========================================
  // Role Style
  // =========================================
  const getRoleStyle = (role) => {

    if (role === "admin") {

      return "bg-violet-100 text-violet-700";
    }

    if (role === "doctor") {

      return "bg-blue-100 text-blue-700";
    }

    return "bg-emerald-100 text-emerald-700";
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
                👥 Organization User Control
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                User Management
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Manage healthcare professionals,
                clinic staff, and administrative users
                securely across the MedSec platform.
              </p>

            </div>

            {/* Add User Button */}
            <button
              onClick={() =>
                setShowCreateModal(true)
              }
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

              <span className="
                relative z-10
                flex items-center gap-3
              ">
                <span className="text-2xl">
                  +
                </span>

                Add User
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

            {/* Total Users */}
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
                  Users
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "--" : users.length}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Platform registered users
              </p>

            </div>

            {/* Doctors */}
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
                  🩺
                </div>

                <div className="
                  text-xs
                  bg-emerald-50
                  text-emerald-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Doctors
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {
                  users.filter(
                    (u) => u.role === "doctor"
                  ).length
                }
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Healthcare doctors onboarded
              </p>

            </div>

            {/* Staff */}
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
                    🏥
                  </div>

                  <div className="
                    text-xs
                    bg-white/10
                    px-3 py-1
                    rounded-full
                    font-semibold
                  ">
                    Staff
                  </div>

                </div>

                <div className="
                  text-4xl font-black mb-2
                ">
                  {
                    users.filter(
                      (u) => u.role === "staff"
                    ).length
                  }
                </div>

                <p className="
                  text-blue-100 text-sm
                ">
                  Operational healthcare staff
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
                placeholder="Search users by name or email..."
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
                  Platform Users
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  Live healthcare organization users
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
            {!loading && filteredUsers.length === 0 ? (

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
                  No Users Found
                </h3>

                <p className="
                  text-slate-500
                  max-w-xl mx-auto
                  leading-relaxed
                ">
                  No healthcare users match the
                  current search criteria.
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
                        Organization
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        User
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Email
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Role
                      </th>

                      <th className="
                        px-8 py-5
                        text-sm font-bold
                        text-slate-600
                      ">
                        Clinic
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
                          Loading Users...
                        </td>

                      </tr>

                    ) : (

                      filteredUsers.map((user) => (

                        <tr
                          key={user.id}
                          className="
                            border-b border-slate-100
                            hover:bg-blue-50/40
                            transition-all
                          "
                        >

                          {/* Organization */}
                          <td className="
                            px-8 py-6
                          ">

                            <code className="
                              text-xs font-mono
                              bg-slate-100 text-slate-700
                              px-3 py-2
                              rounded-xl
                            ">
                              {user.organization_code || "—"}
                            </code>

                          </td>

                          {/* User */}
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
                                {user.full_name
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </div>

                              <div>

                                <div className="
                                  font-semibold
                                  text-slate-800
                                ">
                                  {user.full_name}
                                </div>

                                <div className="
                                  text-sm text-slate-500
                                ">
                                      User ID: {user.id}
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* Email */}
                          <td className="
                            px-8 py-6
                            text-slate-600
                          ">
                            {user.email}
                          </td>

                          {/* Role */}
                          <td className="
                            px-8 py-6
                          ">

                            <span
                              className={`
                                inline-flex items-center
                                px-4 py-2
                                rounded-full
                                text-xs font-bold
                                ${getRoleStyle(user.role)}
                              `}
                            >
                              {user.role}
                            </span>

                          </td>

                          {/* Clinic */}
                          <td className="
                            px-8 py-6
                            text-slate-700
                            font-medium
                          ">
                            {getClinicName(user.clinic_id)}
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

        {/* ========================================= */}
        {/* Create User Modal */}
        {/* ========================================= */}
        {showCreateModal && (

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
                    Create User
                  </h2>

                  <p className="
                    text-slate-500 mt-2
                  ">
                    Add a healthcare professional
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowCreateModal(false)
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

              {/* Form */}
              <div className="space-y-5">

                {/* Full Name */}
                <input
                  placeholder="Full Name"
                  value={newUser.full_name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      full_name: e.target.value,
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

                {/* Email */}
                <input
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
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

                {/* Password */}
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value,
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

                {/* Role */}
                <div>

                  <div className="
                    text-sm font-semibold
                    text-slate-700 mb-3
                  ">
                    Select Role
                  </div>

                  <div className="
                    grid grid-cols-2 gap-4
                  ">

                    {["doctor", "staff"].map((role) => (

                      <button
                        key={role}
                        type="button"
                        onClick={() =>
                          setNewUser({
                            ...newUser,
                            role,
                          })
                        }
                        className={`
                          py-4 rounded-2xl
                          border font-semibold
                          transition-all capitalize
                          ${
                            newUser.role === role
                              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                              : "bg-white hover:bg-blue-50 border-slate-200"
                          }
                        `}
                      >
                        {role}
                      </button>

                    ))}

                  </div>

                </div>

                {/* Clinic */}
                <select
                  value={newUser.clinic_id}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      clinic_id: e.target.value,
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

              </div>

              {/* Footer */}
              <div className="
                flex justify-end gap-4
                mt-8
              ">

                <button
                  onClick={() =>
                    setShowCreateModal(false)
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
                  onClick={createUser}
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
                    : "Create User"}
                </button>

              </div>

            </div>

          </div>

        )}

      </main>
    </>
  );
}