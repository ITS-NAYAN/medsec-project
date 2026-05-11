import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Contact() {
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

        {/* ================= BACKGROUND EFFECTS ================= */}
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

              24/7 Support & Communication

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

              Let’s Build the Future of

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
                Healthcare Together
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
              Have questions, suggestions, or collaboration ideas?
              Our team is ready to help you build secure and intelligent
              healthcare solutions with MedSec.
            </motion.p>

          </div>

          {/* ================= MAIN GRID ================= */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* ================= LEFT INFO ================= */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >

              {/* Info Card */}
              <div
                className="
                  relative
                  overflow-hidden
                  bg-white/80
                  backdrop-blur-2xl
                  border
                  border-blue-100
                  rounded-[36px]
                  p-10
                  shadow-2xl
                "
              >

                {/* Glow */}
                <div
                  className="
                    absolute
                    top-0
                    right-0
                    w-56
                    h-56
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
                    📩 Contact Information
                  </div>

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-slate-900
                      mb-6
                    "
                  >
                    Get in Touch
                  </h2>

                  <p
                    className="
                      text-slate-600
                      text-lg
                      leading-relaxed
                      mb-10
                    "
                  >
                    Reach out for support, collaborations, project discussions,
                    or healthcare technology consultations. We would love to
                    hear from you.
                  </p>

                  {/* Contact Items */}
                  <div className="space-y-6">

                    {[
                      {
                        icon: "📧",
                        title: "Email Address",
                        value: "support@medsec.com",
                      },
                      {
                        icon: "📍",
                        title: "Location",
                        value: "India",
                      },
                      {
                        icon: "📞",
                        title: "Phone",
                        value: "+91 XXXXX XXXXX",
                      },
                    ].map((item, index) => (

                      <motion.div
                        key={index}
                        whileHover={{
                          x: 8,
                        }}
                        className="
                          flex
                          items-center
                          gap-5
                          bg-blue-50/60
                          border
                          border-blue-100
                          rounded-2xl
                          p-5
                          transition-all
                          duration-300
                        "
                      >

                        <div
                          className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-500
                            to-cyan-500
                            flex
                            items-center
                            justify-center
                            text-2xl
                            shadow-lg
                          "
                        >
                          {item.icon}
                        </div>

                        <div>

                          <p className="text-sm text-slate-500 mb-1">
                            {item.title}
                          </p>

                          <h3
                            className="
                              text-lg
                              font-bold
                              text-slate-900
                            "
                          >
                            {item.value}
                          </h3>

                        </div>

                      </motion.div>

                    ))}

                  </div>

                </div>

              </div>

              {/* Bottom Mini Cards */}
              <div className="grid grid-cols-2 gap-5 mt-6">

                <motion.div
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    bg-white/80
                    border
                    border-blue-100
                    rounded-3xl
                    p-6
                    shadow-lg
                  "
                >

                  <div className="text-4xl mb-4">
                    ⚡
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                      mb-1
                    "
                  >
                    Fast Support
                  </h3>

                  <p className="text-slate-500 text-sm">
                    Quick response for all queries
                  </p>

                </motion.div>

                <motion.div
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    bg-white/80
                    border
                    border-blue-100
                    rounded-3xl
                    p-6
                    shadow-lg
                  "
                >

                  <div className="text-4xl mb-4">
                    🔐
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                      mb-1
                    "
                  >
                    Secure
                  </h3>

                  <p className="text-slate-500 text-sm">
                    Protected communication system
                  </p>

                </motion.div>

              </div>

            </motion.div>

            {/* ================= FORM ================= */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >

              <div
                className="
                  relative
                  overflow-hidden
                  bg-white/80
                  backdrop-blur-2xl
                  border
                  border-blue-100
                  rounded-[36px]
                  p-10
                  shadow-2xl
                "
              >

                {/* Glow */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-56
                    h-56
                    bg-cyan-100/40
                    blur-3xl
                    rounded-full
                  "
                />

                <div className="relative z-10">

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
                    🚀 Send Message
                  </div>

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-slate-900
                      mb-8
                    "
                  >
                    Contact Form
                  </h2>

                  <form className="space-y-6">

                    {/* Name */}
                    <div>

                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="
                          w-full
                          px-5
                          py-4
                          rounded-2xl
                          border
                          border-blue-100
                          bg-blue-50/40
                          focus:outline-none
                          focus:ring-4
                          focus:ring-blue-100
                          focus:border-blue-400
                          transition-all
                          duration-300
                        "
                      />

                    </div>

                    {/* Email */}
                    <div>

                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="
                          w-full
                          px-5
                          py-4
                          rounded-2xl
                          border
                          border-blue-100
                          bg-blue-50/40
                          focus:outline-none
                          focus:ring-4
                          focus:ring-blue-100
                          focus:border-blue-400
                          transition-all
                          duration-300
                        "
                      />

                    </div>

                    {/* Message */}
                    <div>

                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Message
                      </label>

                      <textarea
                        rows="6"
                        placeholder="Write your message..."
                        className="
                          w-full
                          px-5
                          py-4
                          rounded-2xl
                          border
                          border-blue-100
                          bg-blue-50/40
                          resize-none
                          focus:outline-none
                          focus:ring-4
                          focus:ring-blue-100
                          focus:border-blue-400
                          transition-all
                          duration-300
                        "
                      />

                    </div>

                    {/* Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      type="button"
                      className="
                        group
                        relative
                        overflow-hidden
                        w-full
                        py-4
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        via-cyan-500
                        to-indigo-600
                        text-white
                        font-semibold
                        text-lg
                        shadow-2xl
                        shadow-blue-200/40
                      "
                    >

                      <span className="relative z-10">
                        Send Message 🚀
                      </span>

                      <div
                        className="
                          absolute
                          inset-0
                          bg-white/20
                          translate-x-[-100%]
                          group-hover:translate-x-[100%]
                          transition-transform
                          duration-1000
                        "
                      />

                    </motion.button>

                  </form>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}