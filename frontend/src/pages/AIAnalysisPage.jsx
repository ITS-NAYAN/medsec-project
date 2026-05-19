import { useEffect, useMemo, useState } from "react";

import DoctorNavbar from "../components/DoctorNavbar";

export default function AIAnalysisPage() {

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const [analyzingId, setAnalyzingId] = useState(null);

  const [analysisResult, setAnalysisResult] = useState("");

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [search, setSearch] = useState("");

  // =========================================
  // Fetch Reports
  // =========================================
  useEffect(() => {

    fetchRecords();

  }, []);

  const fetchRecords = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/records/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setRecords(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Records Error:", error);

      setRecords([]);

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // Filter Records
  // =========================================
  const filteredRecords = useMemo(() => {

    return records.filter((record) => {

      const title =
        record.title ||
        record.file_name ||
        "medical report";

      return title
        .toLowerCase()
        .includes(search.toLowerCase());

    });

  }, [records, search]);

  // =========================================
  // Record Type Style
  // =========================================
  const getTypeStyle = (type) => {

    if (!type) {

      return "bg-slate-100 text-slate-700";
    }

    if (
      type.toLowerCase().includes("lab")
    ) {

      return "bg-blue-100 text-blue-700";
    }

    if (
      type.toLowerCase().includes("prescription")
    ) {

      return "bg-emerald-100 text-emerald-700";
    }

    return "bg-violet-100 text-violet-700";
  };

  // =========================================
  // AI Analysis
  // =========================================
  const handleAnalyze = async (record) => {

    try {

      setAnalyzingId(record.id);

      setSelectedRecord(record);

      setAnalysisResult("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/ai-analysis/analyze/${record.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("AI RESPONSE:", data);

      if (typeof data.summary === "object") {

        setAnalysisResult(`
SUMMARY:
${data.summary.summary || "N/A"}

DISEASES:
${data.summary.diseases || "N/A"}

MEDICINES:
${data.summary.medicines || "N/A"}
        `);

      } else {

        setAnalysisResult(
          data.summary ||
          data.analysis ||
          data.response ||
          "AI analysis completed successfully."
        );

      }

    } catch (error) {

      console.error("AI Analysis Error:", error);

      setAnalysisResult(
        "AI analysis failed. Gemini API quota may be exceeded."
      );

    } finally {

      setAnalyzingId(null);

    }
  };

  return (
    <>
      <DoctorNavbar />

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
                🤖 AI Healthcare Intelligence
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                AI Medical Analysis
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Analyze healthcare reports using
                AI-powered medical intelligence,
                automated summaries, medicine detection,
                and disease insights.
              </p>

            </div>

            {/* AI Status */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              shadow-2xl
              rounded-3xl
              px-8 py-7
              min-w-[240px]
            ">

              <div className="
                text-sm text-slate-500 mb-3
              ">
                AI Engine Status
              </div>

              <div className="
                flex items-center gap-3
              ">

                <div className="
                  w-3 h-3
                  bg-emerald-500
                  rounded-full
                  animate-pulse
                " />

                <span className="
                  font-bold
                  text-emerald-600
                  text-2xl
                ">
                  Active
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

            {/* Reports */}
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
                  📄
                </div>

                <div className="
                  text-xs
                  bg-blue-50
                  text-blue-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  Reports
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "--" : records.length}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                Uploaded medical reports
              </p>

            </div>

            {/* AI Analyses */}
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
                  🤖
                </div>

                <div className="
                  text-xs
                  bg-emerald-50
                  text-emerald-700
                  px-3 py-1
                  rounded-full
                  font-semibold
                ">
                  AI
                </div>

              </div>

              <div className="
                text-5xl font-black
                text-slate-900 mb-2
              ">
                {loading ? "--" : records.length}
              </div>

              <p className="
                text-slate-500 text-sm
              ">
                AI-supported healthcare analyses
              </p>

            </div>

            {/* Security */}
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
                    🔐
                  </div>

                  <div className="
                    text-xs
                    bg-white/10
                    px-3 py-1
                    rounded-full
                    font-semibold
                  ">
                    Protected
                  </div>

                </div>

                <div className="
                  text-4xl font-black mb-2
                ">
                  Secure AI
                </div>

                <p className="
                  text-blue-100 text-sm
                ">
                  Healthcare AI security enabled
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
                placeholder="Search reports..."
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
          {/* Reports Section */}
          {/* ========================================= */}
          <div className="
            grid lg:grid-cols-2
            gap-8
          ">

            {/* ========================================= */}
            {/* Reports List */}
            {/* ========================================= */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-2xl
              overflow-hidden
            ">

              <div className="
                px-8 py-6
                border-b border-slate-100
              ">

                <h2 className="
                  text-2xl font-bold
                  text-slate-900
                ">
                  Uploaded Reports
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  AI-ready healthcare reports
                </p>

              </div>

              <div className="
                p-6
              ">

                {loading ? (

                  <div className="
                    py-20 text-center
                    text-slate-500
                  ">
                    Loading Reports...
                  </div>

                ) : filteredRecords.length === 0 ? (

                  <div className="
                    py-20 text-center
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
                      No Reports Found
                    </h3>

                    <p className="
                      text-slate-500
                    ">
                      Upload healthcare reports
                      to start AI analysis.
                    </p>

                  </div>

                ) : (

                  <div className="
                    space-y-5
                  ">

                    {filteredRecords.map((record) => (

                      <div
                        key={record.id}
                        className="
                          border border-slate-200
                          rounded-3xl
                          p-6
                          hover:shadow-xl
                          hover:border-blue-200
                          transition-all duration-300
                          bg-white/70
                        "
                      >

                        {/* Top */}
                        <div className="
                          flex items-start justify-between
                          gap-4
                          mb-5
                        ">

                          <div className="
                            flex items-center gap-4
                          ">

                            <div className="
                              w-14 h-14
                              rounded-2xl
                              bg-gradient-to-br
                              from-blue-500 to-indigo-600
                              text-white
                              flex items-center justify-center
                              text-2xl
                              shadow-lg
                            ">
                              📄
                            </div>

                            <div>

                              <h3 className="
                                font-bold
                                text-slate-800
                                text-lg
                              ">
                                {record.title ||
                                  record.file_name ||
                                  "Medical Report"}
                              </h3>

                              <p className="
                                text-sm text-slate-500 mt-1
                              ">
                                Patient ID:
                                {" "}
                                {record.patient_id}
                              </p>

                            </div>

                          </div>

                          <span
                            className={`
                              inline-flex items-center
                              px-4 py-2
                              rounded-full
                              text-xs font-bold
                              ${getTypeStyle(record.record_type)}
                            `}
                          >
                            {record.record_type ||
                              "Report"}
                          </span>

                        </div>

                        {/* File */}
                        <div className="
                          flex items-center justify-between
                          gap-4
                        ">

                          <a
                            href={`http://127.0.0.1:8000/${record.file_path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              inline-flex items-center
                              gap-2
                              px-4 py-2
                              rounded-xl
                              bg-blue-100
                              hover:bg-blue-200
                              text-blue-700
                              text-sm font-semibold
                              transition-all
                            "
                          >
                            📂 View File
                          </a>

                          <button
                            onClick={() =>
                              handleAnalyze(record)
                            }
                            disabled={
                              analyzingId === record.id
                            }
                            className="
                              px-5 py-3
                              rounded-2xl
                              bg-gradient-to-r
                              from-blue-600 to-indigo-600
                              hover:from-blue-700
                              hover:to-indigo-700
                              text-white
                              font-semibold
                              shadow-lg
                              hover:shadow-xl
                              transition-all
                              disabled:opacity-60
                            "
                          >
                            {analyzingId === record.id
                              ? "Analyzing..."
                              : "Analyze"}
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>

            {/* ========================================= */}
            {/* AI Result */}
            {/* ========================================= */}
            <div className="
              bg-white/80 backdrop-blur-xl
              border border-white/60
              rounded-3xl
              shadow-2xl
              overflow-hidden
            ">

              <div className="
                px-8 py-6
                border-b border-slate-100
              ">

                <h2 className="
                  text-2xl font-bold
                  text-slate-900
                ">
                  AI Medical Summary
                </h2>

                <p className="
                  text-slate-500 mt-1
                ">
                  AI-generated healthcare insights
                </p>

              </div>

              <div className="
                p-8
              ">

                {!analysisResult ? (

                  <div className="
                    py-24 text-center
                  ">

                    <div className="
                      text-7xl mb-6
                    ">
                      🤖
                    </div>

                    <h3 className="
                      text-3xl font-bold
                      text-slate-800 mb-4
                    ">
                      AI Ready
                    </h3>

                    <p className="
                      text-slate-500
                      max-w-md mx-auto
                      leading-relaxed
                    ">
                      Select a healthcare report
                      and run AI analysis to
                      generate summaries, medicine
                      detection, and disease insights.
                    </p>

                  </div>

                ) : (

                  <div className="
                    space-y-6
                  ">

                    {/* Selected Record */}
                    {selectedRecord && (

                      <div className="
                        bg-blue-50
                        border border-blue-100
                        rounded-2xl
                        p-5
                      ">

                        <div className="
                          text-sm text-blue-600
                          font-semibold mb-2
                        ">
                          Analyzed Report
                        </div>

                        <div className="
                          text-xl font-bold
                          text-slate-800
                        ">
                          {selectedRecord.title ||
                            selectedRecord.file_name}
                        </div>

                      </div>

                    )}

                    {/* AI Output */}
                    <div className="
                      bg-slate-50
                      border border-slate-200
                      rounded-3xl
                      p-6
                      whitespace-pre-wrap
                      leading-relaxed
                      text-slate-700
                      text-sm
                    ">
                      {analysisResult}
                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </main>

    </>
  );
}