import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? `
        relative
        flex
        items-center
        gap-2
        px-5
        py-2.5
        rounded-2xl
        bg-white
        text-blue-700
        font-semibold
        shadow-lg
        border
        border-blue-100
        transition-all
        duration-300
      `
      : `
        relative
        flex
        items-center
        gap-2
        px-5
        py-2.5
        rounded-2xl
        text-slate-600
        hover:bg-white/80
        hover:text-blue-600
        transition-all
        duration-300
      `;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-blue-100/80
        bg-white/80
        backdrop-blur-2xl
        shadow-sm
      "
    >

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex items-center justify-between gap-6">

          {/* ================= LOGO ================= */}
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="
              cursor-pointer
              flex
              items-center
              gap-4
              group
            "
          >

            {/* Logo */}
            <div
              className="
                relative
                w-14
                h-14
                rounded-2xl
                overflow-hidden
                shadow-lg
                shadow-blue-200/40
                border
                border-blue-100
                bg-white
              "
            >

              <img
                src="/logo.png"
                alt="MedSec Logo"
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-300
                "
              />

            </div>

            {/* Text */}
            <div className="leading-tight">

              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-slate-900
                "
              >
                Med
                <span
                  className="
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                  "
                >
                  Sec
                </span>
              </h1>

              <p
                className="
                  text-sm
                  text-slate-500
                  font-medium
                  -mt-1
                "
              >
                Admin Console
              </p>

            </div>

          </div>

          {/* ================= NAVIGATION ================= */}
          <ul
            className="
              hidden
              lg:flex
              items-center
              gap-2
              text-sm
              bg-blue-50/70
              border
              border-blue-100
              p-2
              rounded-3xl
              backdrop-blur-xl
              shadow-sm
            "
          >

            <li>
              <NavLink to="/admin/dashboard" className={linkClass}>
                📊 Overview
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/users" className={linkClass}>
                👥 Users
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/clinics" className={linkClass}>
                🏥 Clinics
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/audit-logs" className={linkClass}>
                📜 Audit Logs
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/access" className={linkClass}>
                🔐 Access Requests
              </NavLink>
            </li>

          </ul>

          {/* ================= RIGHT SECTION ================= */}
          <div className="flex items-center gap-4">

            {/* Status Badge */}
            <div
              className="
                hidden
                md:flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-green-50
                border
                border-green-100
                text-green-700
                text-sm
                font-semibold
              "
            >

              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

              Admin

            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="
                px-5
                py-2.5
                rounded-2xl
                text-sm
                font-semibold
                text-red-500
                hover:bg-red-50
                hover:text-red-600
                border
                border-transparent
                hover:border-red-100
                transition-all
                duration-300
              "
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}