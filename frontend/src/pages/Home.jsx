import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
      },
    }),
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-gradient-to-br
          from-blue-50
          via-white
          to-cyan-50
          flex
          items-center
          pt-28
        "
      >

        {/* Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="
              absolute
              -top-40
              -left-40
              w-[500px]
              h-[500px]
              bg-blue-300/30
              blur-3xl
              rounded-full
            "
          />

          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
            }}
            className="
              absolute
              bottom-[-150px]
              right-[-150px]
              w-[550px]
              h-[550px]
              bg-cyan-300/30
              blur-3xl
              rounded-full
            "
          />

          {/* Grid */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.04]
              bg-[linear-gradient(to_right,#2563eb_1px,transparent_1px),linear-gradient(to_bottom,#2563eb_1px,transparent_1px)]
              bg-[size:60px_60px]
            "
          />

        </div>

        {/* Main Content */}
        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-6
            py-24
            grid
            lg:grid-cols-2
            gap-16
            items-center
          "
        >

          {/* ================= LEFT ================= */}
          <div>

            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="
                inline-flex
                items-center
                gap-3
                px-5
                py-2.5
                rounded-full
                bg-white/80
                border
                border-blue-100
                backdrop-blur-xl
                text-sm
                text-blue-700
                mb-8
                shadow-lg
              "
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

              AI Powered Healthcare Platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="
                text-5xl
                md:text-7xl
                font-black
                leading-[1.05]
                tracking-tight
                text-slate-900
                mb-8
              "
            >

              Future of

              <span
                className="
                  block
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-blue-600
                  via-cyan-500
                  to-indigo-600
                "
              >
                Secure Healthcare
              </span>

              Data Exchange

            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="
                text-lg
                md:text-xl
                text-slate-600
                leading-relaxed
                max-w-2xl
                mb-10
              "
            >
              MedSec enables hospitals and clinics to securely exchange
              healthcare data using AI-powered workflows, encrypted storage,
              and role-based access systems designed for modern healthcare.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-5 mb-10"
            >

              <button
                onClick={() => navigate("/login")}
                className="
                  group
                  relative
                  overflow-hidden
                  px-8
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  via-cyan-500
                  to-indigo-600
                  text-white
                  font-semibold
                  shadow-2xl
                  shadow-blue-200/50
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >

                <span className="relative z-10">
                  🚀 Access Portal
                </span>

                <div
                  className="
                    absolute
                    inset-0
                    bg-white/20
                    translate-x-[-100%]
                    group-hover:translate-x-[100%]
                    transition-all
                    duration-1000
                  "
                />

              </button>

              <button
                onClick={() => navigate("/features")}
                className="
                  px-8
                  py-4
                  rounded-2xl
                  border
                  border-blue-100
                  bg-white/80
                  backdrop-blur-xl
                  text-blue-700
                  font-medium
                  hover:bg-blue-50
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-md
                "
              >
                Explore Features
              </button>

            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="
                grid
                grid-cols-3
                gap-5
                max-w-2xl
              "
            >

              {[
                {
                  number: "250+",
                  label: "Clinics",
                },
                {
                  number: "10K+",
                  label: "Records",
                },
                {
                  number: "99.9%",
                  label: "Secure",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  className="
                    bg-white/80
                    border
                    border-blue-100
                    backdrop-blur-xl
                    rounded-3xl
                    p-5
                    shadow-lg
                  "
                >

                  <h3
                    className="
                      text-3xl
                      font-black
                      text-slate-900
                      mb-1
                    "
                  >
                    {item.number}
                  </h3>

                  <p className="text-slate-500 text-sm">
                    {item.label}
                  </p>

                </div>

              ))}

            </motion.div>

          </div>

          {/* ================= RIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              relative
              flex
              justify-center
            "
          >

            <div
              className="
                relative
                w-full
                max-w-2xl
              "
            >

              {/* Glow */}
              <div
                className="
                  absolute
                  inset-0
                  bg-blue-200/40
                  blur-3xl
                  rounded-full
                  scale-90
                "
              />

              {/* Main Card */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                  relative
                  bg-white/70
                  border
                  border-blue-100
                  backdrop-blur-2xl
                  rounded-[36px]
                  shadow-2xl
                  overflow-hidden
                "
              >

                {/* Top Bar */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-6
                    py-4
                    border-b
                    border-blue-100
                    bg-blue-50/50
                  "
                >

                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />

                </div>

                {/* Image */}
                <div className="p-8">

                  <img
                    src="/Robotdoctor.gif"
                    alt="Healthcare AI"
                    className="
                      w-full
                      object-contain
                      drop-shadow-2xl
                    "
                  />

                </div>

              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  top-10
                  -left-10
                  bg-white
                  rounded-2xl
                  p-5
                  shadow-2xl
                  border
                  border-blue-100
                  hidden
                  md:block
                "
              >

                <p className="text-xs text-slate-500 mb-1">
                  AI Analysis
                </p>

                <h4 className="text-2xl font-black text-blue-700">
                  98%
                </h4>

              </motion.div>

              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  bottom-10
                  -right-10
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-white
                  rounded-2xl
                  p-5
                  shadow-2xl
                  hidden
                  md:block
                "
              >

                <p className="text-xs text-blue-100 mb-1">
                  Security Level
                </p>

                <h4 className="text-2xl font-black">
                  High
                </h4>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-16">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-blue-100
                text-blue-700
                text-sm
                font-semibold
                mb-5
              "
            >
              ✨ Core Features
            </div>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-black
                text-slate-900
                mb-6
              "
            >
              Built for Modern Healthcare
            </h2>

            <p
              className="
                text-lg
                text-slate-600
                max-w-3xl
                mx-auto
              "
            >
              Modern healthcare infrastructure powered by AI,
              cloud scalability, and secure medical workflows.
            </p>

          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                icon: "🔐",
                title: "Secure Encryption",
                desc: "Enterprise-grade encrypted healthcare records.",
              },
              {
                icon: "🏥",
                title: "Clinic Isolation",
                desc: "Independent secure clinic environments.",
              },
              {
                icon: "👨‍⚕️",
                title: "Role-Based Access",
                desc: "Controlled permissions for every role.",
              },
              {
                icon: "⚡",
                title: "AI Intelligence",
                desc: "AI-powered medical analysis and insights.",
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="
                  bg-white
                  border
                  border-blue-100
                  rounded-3xl
                  p-8
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-100
                    to-cyan-100
                    flex
                    items-center
                    justify-center
                    text-3xl
                    mb-6
                  "
                >
                  {item.icon}
                </div>

                <h3
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                    mb-3
                  "
                >
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}