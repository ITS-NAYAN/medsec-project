import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      icon: "🏠",
      path: "/",
    },
    {
      name: "Features",
      icon: "✨",
      path: "/features",
    },
    {
      name: "About",
      icon: "📘",
      path: "/about",
    },
    {
      name: "Contact",
      icon: "📞",
      path: "/contact",
    },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-white/75
        backdrop-blur-2xl
        border-b
        border-blue-100/70
        shadow-sm
      "
    >

      {/* Glow Layer */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-50/40
          via-cyan-50/30
          to-indigo-50/40
          pointer-events-none
        "
      />

      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >

        {/* ================= LOGO ================= */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate("/")}
          className="
            flex
            items-center
            gap-4
            cursor-pointer
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
              bg-white
              border
              border-blue-100
              shadow-xl
              shadow-blue-100/40
            "
          >

            <img
              src="/logo.png"
              alt="MedSec Logo"
              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>

          {/* Text */}
          <div className="leading-tight">

            <h1
              className="
                text-2xl
                font-black
                tracking-tight
              "
            >

              <span className="text-slate-900">
                Med
              </span>

              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-blue-600
                  via-cyan-500
                  to-indigo-600
                "
              >
                Sec
              </span>

            </h1>

            <p
              className="
                text-xs
                text-slate-500
                tracking-wide
                font-medium
              "
            >
              Secure Healthcare Platform
            </p>

          </div>

        </motion.div>

        {/* ================= NAVIGATION ================= */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
            p-2
            rounded-2xl
            border
            border-blue-100
            bg-white/80
            backdrop-blur-xl
            shadow-md
            shadow-blue-100/30
          "
        >

          {navItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  relative
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  font-medium
                  text-sm
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        text-white
                        shadow-lg
                        shadow-blue-200/50
                      `
                      : `
                        text-slate-600
                        hover:text-blue-700
                        hover:bg-blue-50
                      `
                  }
                `
              }
            >

              <span>{item.icon}</span>

              <span>{item.name}</span>

            </NavLink>

          ))}

        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-4">

          {/* Security Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
              hidden
              md:flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-green-200
              bg-green-50
            "
          >

            <div
              className="
                w-2.5
                h-2.5
                rounded-full
                bg-green-500
                animate-pulse
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-green-700
              "
            >
              Secure Platform
            </span>

          </motion.div>

          {/* CTA */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => navigate("/login")}
            className="
              relative
              overflow-hidden
              px-7
              py-3.5
              rounded-2xl
              font-semibold
              text-white
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-indigo-600
              shadow-xl
              shadow-blue-200/40
              transition-all
              duration-300
            "
          >

            {/* Shine */}
            <div
              className="
                absolute
                inset-0
                bg-white/20
                translate-x-[-100%]
                hover:translate-x-[100%]
                transition-transform
                duration-1000
              "
            />

            <span className="relative z-10">
              Access Portal
            </span>

          </motion.button>

        </div>

      </div>

    </motion.nav>
  );
}