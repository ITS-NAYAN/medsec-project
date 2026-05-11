import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: "🔐",
      title: "Secure Records",
      description:
        "Enterprise-grade encryption and secure APIs ensure patient medical records remain fully protected.",
    },
    {
      icon: "🏥",
      title: "Multi-Clinic System",
      description:
        "Manage multiple healthcare organizations with isolated infrastructure and centralized governance.",
    },
    {
      icon: "⚡",
      title: "Fast Access",
      description:
        "Instant access to medical reports, prescriptions, and patient history with optimized workflows.",
    },
    {
      icon: "👨‍⚕️",
      title: "Role-Based Access",
      description:
        "Fine-grained permission management for Admins, Doctors, and Staff members.",
    },
    {
      icon: "📂",
      title: "Medical Record Management",
      description:
        "Upload, organize, retrieve, and securely share healthcare records across clinics.",
    },
    {
      icon: "🤖",
      title: "AI Medical Insights",
      description:
        "AI-powered healthcare analysis for reports, diagnoses, and clinical decision support.",
    },
    {
      icon: "🌐",
      title: "Scalable Infrastructure",
      description:
        "Built using React + FastAPI architecture optimized for scalability and performance.",
    },
    {
      icon: "🔄",
      title: "Cross-Clinic Sharing",
      description:
        "Secure inter-clinic record sharing with approval workflows and audit tracking.",
    },
  ];

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

        {/* Background Glow */}
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
          <div className="text-center mb-20">

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

              Healthcare Innovation Platform

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

              Powerful Features for

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
                Modern Healthcare
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
              "
            >
              MedSec combines AI, security, scalability, and modern healthcare
              workflows into a unified platform for clinics, doctors,
              administrators, and staff.
            </motion.p>

          </div>

          {/* ================= FEATURE GRID ================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">

            {features.map((feature, index) => (

              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="
                  relative
                  overflow-hidden
                  bg-white/80
                  backdrop-blur-2xl
                  border
                  border-blue-100
                  rounded-[28px]
                  p-8
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >

                {/* Glow */}
                <div
                  className="
                    absolute
                    top-0
                    right-0
                    w-32
                    h-32
                    bg-blue-100/30
                    blur-3xl
                    rounded-full
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative
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
                    shadow-sm
                  "
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                    mb-4
                  "
                >
                  {feature.title}
                </h3>

                {/* Desc */}
                <p
                  className="
                    text-slate-600
                    leading-relaxed
                    text-sm
                  "
                >
                  {feature.description}
                </p>

              </motion.div>

            ))}

          </div>

          {/* ================= ADVANCED SECTION ================= */}
          <div
            className="
              relative
              overflow-hidden
              bg-white/70
              backdrop-blur-2xl
              border
              border-blue-100
              rounded-[40px]
              shadow-2xl
              p-10
              md:p-16
            "
          >

            {/* Glow */}
            <div
              className="
                absolute
                top-0
                right-0
                w-72
                h-72
                bg-blue-100/40
                blur-3xl
                rounded-full
              "
            />

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

              {/* LEFT */}
              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-blue-100
                    text-blue-700
                    text-sm
                    font-semibold
                    mb-6
                  "
                >
                  🚀 Enterprise Ready
                </div>

                <h2
                  className="
                    text-4xl
                    md:text-5xl
                    font-black
                    text-slate-900
                    leading-tight
                    mb-8
                  "
                >
                  Designed for the Future of Digital Healthcare
                </h2>

                <p
                  className="
                    text-slate-600
                    text-lg
                    leading-relaxed
                    mb-10
                  "
                >
                  MedSec enables healthcare organizations to securely exchange
                  records, streamline workflows, and leverage AI-powered
                  analysis while maintaining modern compliance and scalability.
                </p>

                <div className="space-y-5">

                  {[
                    "AI-powered medical report analysis",
                    "Secure access request workflow",
                    "Encrypted record management",
                    "Cross-clinic healthcare collaboration",
                    "Modern scalable architecture",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >

                      <div
                        className="
                          w-8
                          h-8
                          rounded-full
                          bg-green-100
                          flex
                          items-center
                          justify-center
                          text-green-600
                          font-bold
                        "
                      >
                        ✓
                      </div>

                      <p className="text-slate-700 font-medium">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

              {/* RIGHT */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                  relative
                  bg-gradient-to-br
                  from-blue-600
                  via-cyan-500
                  to-indigo-600
                  rounded-[32px]
                  p-10
                  text-white
                  shadow-2xl
                "
              >

                <div className="mb-10">

                  <div className="text-6xl mb-6">
                    🏥
                  </div>

                  <h3
                    className="
                      text-3xl
                      font-black
                      mb-4
                    "
                  >
                    MedSec Platform
                  </h3>

                  <p className="text-blue-100 leading-relaxed">
                    Delivering secure, intelligent, and scalable healthcare
                    infrastructure for clinics and hospitals.
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-6">

                  {[
                    {
                      number: "99.9%",
                      label: "Secure",
                    },
                    {
                      number: "24/7",
                      label: "Availability",
                    },
                    {
                      number: "AI",
                      label: "Powered",
                    },
                    {
                      number: "Cloud",
                      label: "Scalable",
                    },
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="
                        bg-white/10
                        backdrop-blur-xl
                        border
                        border-white/10
                        rounded-2xl
                        p-5
                      "
                    >

                      <h4
                        className="
                          text-3xl
                          font-black
                          mb-1
                        "
                      >
                        {item.number}
                      </h4>

                      <p className="text-blue-100 text-sm">
                        {item.label}
                      </p>

                    </div>

                  ))}

                </div>

              </motion.div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}