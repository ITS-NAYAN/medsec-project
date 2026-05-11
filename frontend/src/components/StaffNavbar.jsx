import { NavLink, useNavigate } from "react-router-dom";

export default function StaffNavbar() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow-sm"
      : "px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* 🔷 Logo */}
        <div
          onClick={() => navigate("/staff/dashboard")}
          className="cursor-pointer"
        >
          <h1 className="text-xl font-bold">
            <span className="text-blue-700">MedSec</span>{" "}
            <span className="text-slate-500 text-sm font-medium">
              Staff Portal
            </span>
          </h1>
        </div>

        {/* 🔗 Navigation */}
        <ul className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-700">

          <li>
            <NavLink to="/staff/dashboard" className={linkClass}>
              📊 Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/staff/patients" className={linkClass}>
              🧑‍⚕️ Patients
            </NavLink>
          </li>

          <li>
            <NavLink to="/staff/records" className={linkClass}>
              📄 Records
            </NavLink>
          </li>

        </ul>

        {/* 🔥 Right Section */}
        <div className="flex items-center gap-4">

          {/* Role Badge */}
          <div className="hidden md:block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            Staff
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}