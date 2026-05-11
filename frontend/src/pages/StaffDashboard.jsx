import { useEffect, useMemo, useState } from "react";

import StaffNavbar from "../components/StaffNavbar";
import ChatbotWidget from "../components/ChatbotWidget";

export default function StaffDashboard() {

  const [patients, setPatients] = useState([]);

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================================
  // Fetch Dashboard Data
  // =========================================
  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const token = localStorage.getItem("token");

        // ================= PATIENTS =================
        const patientsRes = await fetch(
          "http://127.0.0.1:8000/patients/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const patientsData = await patientsRes.json();

        setPatients(
          Array.isArray(patientsData)
            ? patientsData
            : []
        );

        // ================= RECORDS =================
        const recordsRes = await fetch(
          "http://127.0.0.1:8000/records/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const recordsData = await recordsRes.json();

        setRecords(
          Array.isArray(recordsData)
            ? recordsData
            : []
        );

      } catch (error) {

        console.error("Dashboard Error:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboardData();

  }, []);

  // =========================================
  // Dashboard Stats
  // =========================================
  const totalPatients = patients.length;

  const totalRecords = records.length;

  const recentRecords = useMemo(() => {

    return [...records]
      .slice(0, 5);

  }, [records]);

  return (
    <>
      <StaffNavbar />

      <main className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50 via-white to-blue-50
        overflow-hidden
      ">

        {/* Background Effects */}
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
                🏥 Clinic Operations
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                Staff Dashboard
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Access patient information,
                review medical records,
                and manage daily clinical operations securely.
              </p>

            </div>

            <div className="
              bg-white/70 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-lg
              px-8 py-6
              min-w-[280px]
            ">

              <div className="
                text-sm text-slate-500 mb-2
              ">
                System Status
              </div>

              <div className="
                flex items-center gap-3
              ">

                <div className="
                  w-4 h-4
                  rounded-full
                  bg-emerald-500
                  animate-pulse
                " />

                <span className="
                  text-2xl font-black
                  text-slate-900
                ">
                  Online
                </span>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Stats */}
          {/* ========================================= */}
          <div className="
            grid grid-cols-1
            md:grid-cols-3
            gap-6 mb-10
          ">

            {/* Patients */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
            ">

              <div className="
                flex items-center justify-between
                mb-6
              ">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                  text-3xl
                ">
                  🧑‍⚕️
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
                {loading ? "..." : totalPatients}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Assigned patients
              </p>

            </div>

            {/* Records */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
            ">

              <div className="
                flex items-center justify-between
                mb-6
              ">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-emerald-100
                  flex items-center justify-center
                  text-3xl
                ">
                  📄
                </div>

                <div className="
                  text-xs
                  bg-emerald-50
                  text-emerald-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Records
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "..." : totalRecords}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Medical records viewed
              </p>

            </div>

            {/* Permissions */}
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
                  flex items-center justify-between
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
                    Secure
                  </div>

                </div>

                <div className="
                  text-4xl font-black mb-2
                ">
                  RBAC
                </div>

                <p className="
                  text-blue-100 text-sm
                ">
                  Role-based access enabled
                </p>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Main Content */}
          {/* ========================================= */}
          <div className="
            grid grid-cols-1
            xl:grid-cols-3
            gap-8
          ">

            {/* ===================================== */}
            {/* Recent Records */}
            {/* ===================================== */}
            <div className="
              xl:col-span-2
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
                flex items-center justify-between
              ">

                <div>

                  <h2 className="
                    text-2xl font-bold
                    text-slate-900
                  ">
                    Recent Activity
                  </h2>

                  <p className="
                    text-slate-500 mt-1
                  ">
                    Latest patient record interactions
                  </p>

                </div>

                <div className="
                  bg-blue-100 text-blue-700
                  px-4 py-2
                  rounded-full
                  text-sm font-semibold
                ">
                  Live
                </div>

              </div>

              {/* Content */}
              <div className="
                divide-y divide-slate-100
              ">

                {loading ? (

                  <div className="
                    p-10 text-center
                    text-slate-500
                  ">
                    Loading activity...
                  </div>

                ) : recentRecords.length > 0 ? (

                  recentRecords.map((record) => (

                    <div
                      key={record.id}
                      className="
                        px-8 py-6
                        hover:bg-blue-50/40
                        transition-all
                      "
                    >

                      <div className="
                        flex items-start
                        justify-between
                        gap-4
                      ">

                        <div className="
                          flex items-start gap-4
                        ">

                          <div className="
                            w-14 h-14
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-500 to-indigo-600
                            text-white
                            flex items-center justify-center
                            shadow-lg
                            text-2xl
                          ">
                            📄
                          </div>

                          <div>

                            <h3 className="
                              font-bold
                              text-slate-800
                              text-lg
                            ">
                              {record.title || "Medical Record"}
                            </h3>

                            <p className="
                              text-slate-500 mt-1
                            ">
                              Patient ID: {record.patient_id}
                            </p>

                            <div className="
                              mt-3
                              inline-flex items-center
                              px-3 py-1
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              text-xs font-semibold
                            ">
                              {record.record_type || "Record"}
                            </div>

                          </div>

                        </div>

                        <div className="
                          text-sm text-slate-400
                        ">
                          Recent
                        </div>

                      </div>

                    </div>

                  ))

                ) : (

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
                      No Activity Yet
                    </h3>

                    <p className="
                      text-slate-500
                      max-w-xl mx-auto
                    ">
                      Patient record activity
                      will appear here once
                      records are accessed.
                    </p>

                  </div>

                )}

              </div>

            </div>

            {/* ===================================== */}
            {/* Permissions */}
            {/* ===================================== */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-2xl
              p-8
              h-fit
            ">

              <div className="
                flex items-center gap-4
                mb-8
              ">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                  text-3xl
                ">
                  🛡️
                </div>

                <div>

                  <h2 className="
                    text-2xl font-bold
                    text-slate-900
                  ">
                    Permissions
                  </h2>

                  <p className="
                    text-slate-500 text-sm
                  ">
                    Access capabilities
                  </p>

                </div>

              </div>

              <div className="
                space-y-5
              ">

                {[
                  {
                    icon: "✅",
                    title: "View patient records",
                    color: "emerald",
                  },
                  {
                    icon: "✅",
                    title: "Access medical history",
                    color: "emerald",
                  },
                  {
                    icon: "❌",
                    title: "Edit medical records",
                    color: "red",
                  },
                  {
                    icon: "❌",
                    title: "Delete patient data",
                    color: "red",
                  },
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                      flex items-center gap-4
                      p-4
                      rounded-2xl
                      bg-slate-50
                    "
                  >

                    <div className={`
                      w-12 h-12
                      rounded-2xl
                      flex items-center justify-center
                      text-xl
                      ${
                        item.color === "emerald"
                          ? "bg-emerald-100"
                          : "bg-red-100"
                      }
                    `}>
                      {item.icon}
                    </div>

                    <div>

                      <div className="
                        font-semibold
                        text-slate-800
                      ">
                        {item.title}
                      </div>

                      <div className="
                        text-sm text-slate-500
                      ">
                        Permission rule
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </main>

      <ChatbotWidget />
    </>
  );
}