import { useEffect, useState } from "react";

import DoctorNavbar from "../components/DoctorNavbar";
import ChatbotWidget from "../components/ChatbotWidget";

export default function DoctorDashboard() {

  const [patientsCount, setPatientsCount] = useState(0);

  const [recordsCount, setRecordsCount] = useState(0);

  const [loading, setLoading] = useState(true);

  // =========================================
  // Fetch Dashboard Data
  // =========================================
  useEffect(() => {

    const fetchDashboardData = async () => {

      const token = localStorage.getItem("token");

      try {

        // =========================================
        // Patients
        // =========================================
        const patientsRes = await fetch(
          "http://127.0.0.1:8000/patients/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const patientsData = await patientsRes.json();

        setPatientsCount(
          Array.isArray(patientsData)
            ? patientsData.length
            : 0
        );

        // =========================================
        // Records
        // =========================================
        const recordsRes = await fetch(
          "http://127.0.0.1:8000/records/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const recordsData = await recordsRes.json();

        setRecordsCount(
          Array.isArray(recordsData)
            ? recordsData.length
            : 0
        );

      } catch (error) {

        console.error("Doctor Dashboard Error:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboardData();

  }, []);

  return (
    <>
      <DoctorNavbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

        {/* Background Blur Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 blur-3xl rounded-full" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 blur-3xl rounded-full" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">

          {/* ========================================= */}
          {/* Header */}
          {/* ========================================= */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12">

            <div>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm mb-5">
                🩺 Doctor Control Center
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-5">
                Welcome, Doctor 👨‍⚕️
              </h1>

              <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                Access patient records, upload medical reports,
                monitor healthcare activity, and leverage AI-powered
                clinical assistance through MedSec.
              </p>

            </div>

            {/* Status Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl px-8 py-7 min-w-[240px]">

              <div className="text-sm text-slate-500 mb-3">
                AI Healthcare System
              </div>

              <div className="flex items-center gap-3">

                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />

                <span className="font-bold text-emerald-600 text-2xl">
                  Active
                </span>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Stats */}
          {/* ========================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {/* Patients */}
            <div className="
              group
              bg-white/80
              backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all duration-300
            ">

              <div className="flex items-start justify-between mb-6">

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

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : patientsCount}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Registered healthcare patients
              </p>

            </div>

            {/* Records */}
            <div className="
              group
              bg-white/80
              backdrop-blur-xl
              border border-white/60
              rounded-3xl
              p-6
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all duration-300
            ">

              <div className="flex items-start justify-between mb-6">

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

              <div className="text-5xl font-black text-slate-900 mb-2">
                {loading ? "--" : recordsCount}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Medical reports uploaded
              </p>

            </div>

            {/* Security */}
            <div className="
              relative overflow-hidden
              bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700
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

                <div className="flex items-start justify-between mb-6">

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
                    Security
                  </div>

                </div>

                <div className="text-4xl font-black mb-2">
                  Protected
                </div>

                <p className="text-blue-100 text-sm">
                  Encrypted healthcare infrastructure
                </p>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Dashboard Sections */}
          {/* ========================================= */}
          <div className="grid xl:grid-cols-2 gap-6 mb-10">

            {/* ========================================= */}
            {/* Recent Clinical Activity */}
            {/* ========================================= */}
            <div className="
              bg-white/80
              backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-xl
              p-8
            ">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold text-slate-900">
                    Clinical Activity
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Live healthcare operations overview
                  </p>

                </div>

                <div className="
                  bg-blue-50
                  text-blue-700
                  px-4 py-2
                  rounded-full
                  text-sm
                  font-semibold
                ">
                  Live Feed
                </div>

              </div>

              <div className="space-y-5">

                {/* Patients */}
                <div className="
                  flex items-center justify-between
                  p-5 rounded-2xl
                  border border-slate-100
                  hover:bg-blue-50/40
                  transition-all
                ">

                  <div className="flex items-center gap-4">

                    <div className="
                      w-14 h-14
                      rounded-2xl
                      bg-blue-100
                      flex items-center justify-center
                      text-2xl
                    ">
                      👥
                    </div>

                    <div>

                      <div className="font-bold text-slate-800">
                        Registered Patients
                      </div>

                      <div className="text-sm text-slate-500">
                        Total healthcare patients
                      </div>

                    </div>

                  </div>

                  <div className="text-3xl font-black text-blue-700">
                    {patientsCount}
                  </div>

                </div>

                {/* Records */}
                <div className="
                  flex items-center justify-between
                  p-5 rounded-2xl
                  border border-slate-100
                  hover:bg-emerald-50/40
                  transition-all
                ">

                  <div className="flex items-center gap-4">

                    <div className="
                      w-14 h-14
                      rounded-2xl
                      bg-emerald-100
                      flex items-center justify-center
                      text-2xl
                    ">
                      📂
                    </div>

                    <div>

                      <div className="font-bold text-slate-800">
                        Medical Reports
                      </div>

                      <div className="text-sm text-slate-500">
                        Uploaded patient records
                      </div>

                    </div>

                  </div>

                  <div className="text-3xl font-black text-emerald-600">
                    {recordsCount}
                  </div>

                </div>

                {/* AI */}
                <div className="
                  flex items-center justify-between
                  p-5 rounded-2xl
                  border border-slate-100
                  hover:bg-violet-50/40
                  transition-all
                ">

                  <div className="flex items-center gap-4">

                    <div className="
                      w-14 h-14
                      rounded-2xl
                      bg-violet-100
                      flex items-center justify-center
                      text-2xl
                    ">
                      🤖
                    </div>

                    <div>

                      <div className="font-bold text-slate-800">
                        AI Analysis Engine
                      </div>

                      <div className="text-sm text-slate-500">
                        Clinical intelligence operational
                      </div>

                    </div>

                  </div>

                  <div className="text-lg font-bold text-violet-600">
                    Online
                  </div>

                </div>

              </div>

            </div>

            {/* ========================================= */}
            {/* Clinical Insights */}
            {/* ========================================= */}
            <div className="
              relative overflow-hidden
              bg-gradient-to-br
              from-blue-600
              via-indigo-600
              to-violet-700
              rounded-3xl
              shadow-2xl
              p-8
              text-white
            ">

              <div className="
                absolute top-0 right-0
                w-72 h-72
                bg-white/10
                blur-3xl
                rounded-full
              " />

              <div className="relative z-10">

                <div className="
                  inline-flex items-center gap-2
                  bg-white/10 backdrop-blur-md
                  px-5 py-2
                  rounded-full
                  text-sm font-semibold
                  mb-6
                ">
                  🧠 AI Clinical Insights
                </div>

                <h2 className="text-4xl font-black mb-4">
                  Smart Healthcare Intelligence
                </h2>

                <p className="text-blue-100 text-lg leading-relaxed mb-8">
                  MedSec AI continuously assists doctors
                  in healthcare operations, report analysis,
                  and secure patient data management.
                </p>

                <div className="space-y-4">

                  {[
                    "AI Medical Report Analysis",
                    "Secure Encrypted Record Storage",
                    "Role-Based Access Management",
                    "Government Scheme Eligibility Support",
                    "Healthcare Compliance Monitoring",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="
                        flex items-center gap-4
                        bg-white/10 backdrop-blur-md
                        rounded-2xl
                        px-5 py-4
                        border border-white/10
                      "
                    >

                      <div className="
                        w-10 h-10
                        rounded-xl
                        bg-emerald-400/20
                        flex items-center justify-center
                      ">
                        ✅
                      </div>

                      <span className="font-medium">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      <ChatbotWidget />
    </>
  );
}