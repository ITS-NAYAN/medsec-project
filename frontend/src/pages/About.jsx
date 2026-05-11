import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function About() {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
      },
    }),
  };

  const capabilities = [
    {
      icon: "🔐",
      title: "Data Security",
      desc: "Advanced authentication and role-based permissions ensure complete protection of patient healthcare data.",
    },
    {
      icon: "🏥",
      title: "Multi-Clinic Support",
      desc: "Independent clinic infrastructure with centralized and secure healthcare collaboration.",
    },
    {
      icon: "⚡",
      title: "High Performance",
      desc: "FastAPI-powered backend delivers fast and scalable medical record workflows.",
    },
  ];

  const techStack = [
    {
      badge: "Backend",
      icon: "⚡",
      title: "FastAPI",
      desc: "Modern Python backend optimized for secure and scalable APIs.",
    },
    {
      badge: "Frontend",
      icon: "🎨",
      title: "React + Tailwind",
      desc: "Premium responsive user experience powered by modern frontend technologies.",
    },
    {
      badge: "Database",
      icon: "🗄️",
      title: "PostgreSQL",
      desc: "Reliable and enterprise-ready healthcare data storage architecture.",
    },
  ];

  return (
    <>
      <Navbar />

      <main
        className="
          relative
          overflow-hidden
          min-h-screen
          bg-gradient-to-br
          from-blue-50
          via-white
          to-cyan-50
          pt-32
        "
      >

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">

          <div
            className="
              absolute
              top-0
              left-0
              w-[500px]
              h-[500px]
              bg-blue-200/30
              blur-3xl
              rounded-full
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              w-[500px]
              h-[500px]
              bg-cyan-200/30
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* ================= HERO ================= */}
          <div className="text-center mb-24">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
                shadow-lg
                mb-8
              "
            >

              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

              Next Generation Healthcare Platform

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="
                text-5xl
                md:text-7xl
                font-black
                leading-tight
                tracking-tight
                text-slate-900
                mb-8
              "
            >

              Redefining

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
                Healthcare Connectivity
              </span>

            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="
                text-lg
                md:text-xl
                text-slate-600
                max-w-3xl
                mx-auto
                leading-relaxed
                mb-10
              "
            >
              MedSec bridges the gap between clinics by enabling secure,
              seamless, and intelligent healthcare data exchange built for
              the future of digital healthcare systems.
            </motion.p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-4">

              {[
                "🔐 Secure by Design",
                "⚡ Fast & Scalable",
                "🏥 Multi-Clinic Ready",
                "🤖 AI Powered",
              ].map((tag, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-white/80
                    border
                    border-blue-100
                    backdrop-blur-xl
                    text-blue-700
                    text-sm
                    font-medium
                    shadow-md
                  "
                >
                  {tag}
                </motion.div>

              ))}

            </div>

          </div>

          {/* ================= PROBLEM + SOLUTION ================= */}
          <div className="grid lg:grid-cols-2 gap-10 mb-24">

            {/* Problem */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="
                relative
                overflow-hidden
                bg-red-50/80
                border
                border-red-100
                rounded-[32px]
                p-10
                shadow-xl
              "
            >

              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-40
                  h-40
                  bg-red-200/30
                  blur-3xl
                  rounded-full
                "
              />

              <div className="relative z-10">

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-red-100
                    flex
                    items-center
                    justify-center
                    text-3xl
                    mb-6
                  "
                >
                  ⚠️
                </div>

                <h2
                  className="
                    text-3xl
                    font-black
                    text-red-600
                    mb-5
                  "
                >
                  The Problem
                </h2>

                <p className="text-slate-600 leading-relaxed text-lg">
                  Healthcare data is fragmented across clinics and hospitals,
                  making it difficult to securely access patient history,
                  collaborate between organizations, and provide efficient care.
                </p>

              </div>

            </motion.div>

            {/* Solution */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="
                relative
                overflow-hidden
                bg-green-50/80
                border
                border-green-100
                rounded-[32px]
                p-10
                shadow-xl
              "
            >

              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-40
                  h-40
                  bg-green-200/30
                  blur-3xl
                  rounded-full
                "
              />

              <div className="relative z-10">

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    text-3xl
                    mb-6
                  "
                >
                  ✅
                </div>

                <h2
                  className="
                    text-3xl
                    font-black
                    text-green-600
                    mb-5
                  "
                >
                  Our Solution
                </h2>

                <p className="text-slate-600 leading-relaxed text-lg">
                  MedSec provides a secure, scalable, and AI-powered healthcare
                  ecosystem where clinics can store, access, and share medical
                  records efficiently and safely.
                </p>

              </div>

            </motion.div>

          </div>

          {/* ================= MISSION + VISION ================= */}
          <div className="grid lg:grid-cols-2 gap-10 mb-24">

            <motion.div
              whileHover={{
                y: -8,
              }}
              className="
                bg-white/80
                backdrop-blur-2xl
                border
                border-blue-100
                rounded-[32px]
                p-10
                shadow-xl
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
                🚀
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-blue-700
                  mb-5
                "
              >
                Our Mission
              </h2>

              <p className="text-slate-600 leading-relaxed text-lg">
                To make healthcare data accessible, secure, and efficient for
                clinics of all sizes while improving collaboration and patient
                outcomes.
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
              }}
              className="
                bg-white/80
                backdrop-blur-2xl
                border
                border-blue-100
                rounded-[32px]
                p-10
                shadow-xl
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
                🌍
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-blue-700
                  mb-5
                "
              >
                Our Vision
              </h2>

              <p className="text-slate-600 leading-relaxed text-lg">
                To build a unified digital healthcare ecosystem where medical
                records are always secure, available, and intelligently connected.
              </p>

            </motion.div>

          </div>

          {/* ================= CAPABILITIES ================= */}
          <div className="mb-24">

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
                ⚡ Core Capabilities
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

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {capabilities.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="
                    bg-white/80
                    border
                    border-blue-100
                    backdrop-blur-xl
                    rounded-[28px]
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
                      text-2xl
                      font-bold
                      text-slate-900
                      mb-4
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

          {/* ================= TECHNOLOGY ================= */}
          <div className="mb-24">

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
                ⚙️ Technology Stack
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
                Powered by Modern Technology
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-10">

              {techStack.map((tech, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="
                    relative
                    overflow-hidden
                    bg-white/80
                    border
                    border-blue-100
                    rounded-[32px]
                    p-10
                    shadow-xl
                    text-center
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-40
                      h-40
                      bg-blue-100/40
                      blur-3xl
                      rounded-full
                    "
                  />

                  <div className="relative z-10">

                    <div
                      className="
                        inline-flex
                        items-center
                        justify-center
                        px-4
                        py-1.5
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-sm
                        font-semibold
                        mb-6
                      "
                    >
                      {tech.badge}
                    </div>

                    <div className="text-5xl mb-6">
                      {tech.icon}
                    </div>

                    <h3
                      className="
                        text-2xl
                        font-black
                        text-slate-900
                        mb-4
                      "
                    >
                      {tech.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed">
                      {tech.desc}
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

          {/* ================= FINAL CTA ================= */}
          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            className="
              relative
              overflow-hidden
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-indigo-600
              rounded-[40px]
              p-14
              text-center
              shadow-2xl
            "
          >

            <div
              className="
                absolute
                inset-0
                bg-white/10
                opacity-20
              "
            />

            <div className="relative z-10">

              <h2
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  text-white
                  mb-6
                "
              >
                Built for Real-World Healthcare
              </h2>

              <p
                className="
                  max-w-3xl
                  mx-auto
                  text-blue-100
                  text-lg
                  leading-relaxed
                  mb-10
                "
              >
                MedSec is more than a project — it is a secure and scalable
                healthcare ecosystem designed to solve real-world medical
                collaboration challenges.
              </p>

              <div className="flex flex-wrap justify-center gap-4">

                {[
                  "🔐 Secure Systems",
                  "⚡ High Performance",
                  "🌐 Scalable Architecture",
                  "🤖 AI Ready",
                ].map((tag, index) => (

                  <div
                    key={index}
                    className="
                      px-5
                      py-3
                      rounded-2xl
                      bg-white/15
                      backdrop-blur-xl
                      border
                      border-white/10
                      text-white
                      text-sm
                      font-medium
                    "
                  >
                    {tag}
                  </div>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

      </main>

      <Footer />
    </>
  );
}