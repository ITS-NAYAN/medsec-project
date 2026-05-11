import { useEffect, useState } from "react";

import DoctorNavbar from "../components/DoctorNavbar";

export default function DoctorUploadRecord() {

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [fetchingPatients, setFetchingPatients] = useState(true);

  const [form, setForm] = useState({
    patient_id: "",
    title: "",
    record_type: "",
    description: "",
    file: null,
  });

  // =========================================
  // Fetch Patients
  // =========================================
  useEffect(() => {

    fetchPatients();

  }, []);

  const fetchPatients = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/patients/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setPatients(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Patients Error:", error);

      setPatients([]);

    } finally {

      setFetchingPatients(false);

    }
  };

  // =========================================
  // Upload Record
  // =========================================
  const handleUpload = async (e) => {

    e.preventDefault();

    setLoading(true);

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("patient_id", form.patient_id);

    formData.append("title", form.title);

    formData.append("record_type", form.record_type);

    formData.append("description", form.description);

    formData.append("file", form.file);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/records/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.detail || "Upload failed");

        setLoading(false);

        return;
      }

      alert("✅ Record uploaded successfully");

      setForm({
        patient_id: "",
        title: "",
        record_type: "",
        description: "",
        file: null,
      });

    } catch (error) {

      console.error("Upload Error:", error);

      alert("Network Error");

    } finally {

      setLoading(false);

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
                ⬆️ Secure Healthcare Upload
              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black tracking-tight
                text-slate-900
                leading-tight mb-5
              ">
                Upload Medical Record
              </h1>

              <p className="
                text-slate-600 text-lg
                max-w-3xl leading-relaxed
              ">
                Upload healthcare reports, prescriptions,
                diagnoses, and medical documents securely
                into the MedSec infrastructure.
              </p>

            </div>

            {/* Security Status */}
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
                Upload Security
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
                  Encrypted
                </span>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Main Grid */}
          {/* ========================================= */}
          <div className="
            grid lg:grid-cols-3
            gap-8
          ">

            {/* ========================================= */}
            {/* Left Info Panel */}
            {/* ========================================= */}
            <div className="
              space-y-6
            ">

              {/* Stats */}
              <div className="
                bg-white/80 backdrop-blur-xl
                border border-white/60
                rounded-3xl
                p-6
                shadow-lg
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
                    👥
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
                  {fetchingPatients
                    ? "--"
                    : patients.length}
                </div>

                <p className="
                  text-slate-500 text-sm
                ">
                  Registered patients available
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
                    HIPAA Safe
                  </div>

                  <p className="
                    text-blue-100 text-sm
                  ">
                    End-to-end encrypted medical uploads
                  </p>

                </div>

              </div>

              {/* Tips */}
              <div className="
                bg-white/80 backdrop-blur-xl
                border border-white/60
                rounded-3xl
                p-6
                shadow-lg
              ">

                <h3 className="
                  text-xl font-bold
                  text-slate-900 mb-4
                ">
                  Upload Guidelines
                </h3>

                <div className="
                  space-y-3
                  text-sm text-slate-600
                ">

                  <div className="flex gap-3">
                    <span>✅</span>
                    <span>
                      Upload PDF, PNG, JPG, DOC files
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <span>✅</span>
                    <span>
                      Ensure patient is selected correctly
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <span>✅</span>
                    <span>
                      Data is securely encrypted
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <span>✅</span>
                    <span>
                      AI analysis supported for reports
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* ========================================= */}
            {/* Upload Form */}
            {/* ========================================= */}
            <div className="
              lg:col-span-2
            ">

              <div className="
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
                ">

                  <h2 className="
                    text-2xl font-bold
                    text-slate-900
                  ">
                    Upload Record
                  </h2>

                  <p className="
                    text-slate-500 mt-1
                  ">
                    Securely store patient medical documents
                  </p>

                </div>

                {/* Form */}
                <form
                  onSubmit={handleUpload}
                  className="
                    p-8
                    space-y-7
                  "
                >

                  {/* Patient */}
                  <div>

                    <label className="
                      block
                      text-sm font-semibold
                      text-slate-700
                      mb-3
                    ">
                      Select Patient
                    </label>

                    <select
                      value={form.patient_id}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          patient_id: e.target.value,
                        })
                      }
                      required
                      className="
                        w-full
                        px-5 py-4
                        rounded-2xl
                        border border-slate-200
                        bg-slate-50/70
                        focus:outline-none
                        focus:ring-4 focus:ring-blue-100
                        focus:border-blue-400
                        transition-all
                      "
                    >

                      <option value="">
                        Choose patient
                      </option>

                      {patients.map((patient) => (

                        <option
                          key={patient.id}
                          value={patient.id}
                        >
                          {patient.name}
                        </option>

                      ))}

                    </select>

                  </div>

                  {/* Title */}
                  <div>

                    <label className="
                      block
                      text-sm font-semibold
                      text-slate-700
                      mb-3
                    ">
                      Record Title
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Blood Test Report"
                      value={form.title}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          title: e.target.value,
                        })
                      }
                      required
                      className="
                        w-full
                        px-5 py-4
                        rounded-2xl
                        border border-slate-200
                        bg-slate-50/70
                        focus:outline-none
                        focus:ring-4 focus:ring-blue-100
                        focus:border-blue-400
                        transition-all
                      "
                    />

                  </div>

                  {/* Record Type */}
                  <div>

                    <label className="
                      block
                      text-sm font-semibold
                      text-slate-700
                      mb-3
                    ">
                      Record Type
                    </label>

                    <select
                      value={form.record_type}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          record_type: e.target.value,
                        })
                      }
                      required
                      className="
                        w-full
                        px-5 py-4
                        rounded-2xl
                        border border-slate-200
                        bg-slate-50/70
                        focus:outline-none
                        focus:ring-4 focus:ring-blue-100
                        focus:border-blue-400
                        transition-all
                      "
                    >

                      <option value="">
                        Select type
                      </option>

                      <option value="Prescription">
                        Prescription
                      </option>

                      <option value="Diagnosis">
                        Diagnosis
                      </option>

                      <option value="Lab Report">
                        Lab Report
                      </option>

                    </select>

                  </div>

                  {/* Description */}
                  <div>

                    <label className="
                      block
                      text-sm font-semibold
                      text-slate-700
                      mb-3
                    ">
                      Description
                    </label>

                    <textarea
                      rows="5"
                      placeholder="Optional medical notes or record description..."
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description: e.target.value,
                        })
                      }
                      className="
                        w-full
                        px-5 py-4
                        rounded-2xl
                        border border-slate-200
                        bg-slate-50/70
                        focus:outline-none
                        focus:ring-4 focus:ring-blue-100
                        focus:border-blue-400
                        transition-all
                        resize-none
                      "
                    />

                  </div>

                  {/* Upload */}
                  <div>

                    <label className="
                      block
                      text-sm font-semibold
                      text-slate-700
                      mb-3
                    ">
                      Upload File
                    </label>

                    <div className="
                      relative
                      border-2 border-dashed
                      border-blue-200
                      rounded-3xl
                      p-10
                      bg-blue-50/40
                      hover:bg-blue-50/70
                      transition-all
                      text-center
                    ">

                      <div className="
                        text-6xl mb-4
                      ">
                        📄
                      </div>

                      <p className="
                        text-lg font-semibold
                        text-slate-700 mb-2
                      ">
                        Drag & Drop or Browse File
                      </p>

                      <p className="
                        text-sm text-slate-500 mb-6
                      ">
                        PDF, JPG, PNG, DOC supported
                      </p>

                      <input
                        type="file"
                        required
                        onChange={(e) =>
                          setForm({
                            ...form,
                            file: e.target.files[0],
                          })
                        }
                        className="
                          block
                          mx-auto
                          text-sm text-slate-600
                        "
                      />

                      {form.file && (

                        <div className="
                          mt-5
                          inline-flex items-center gap-2
                          bg-emerald-100
                          text-emerald-700
                          px-4 py-2
                          rounded-full
                          text-sm font-semibold
                        ">
                          ✅ {form.file.name}
                        </div>

                      )}

                    </div>

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      py-5
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-600 to-indigo-600
                      hover:from-blue-700 hover:to-indigo-700
                      text-white
                      font-bold
                      text-lg
                      shadow-xl
                      hover:shadow-2xl
                      transition-all
                      disabled:opacity-60
                    "
                  >
                    {loading
                      ? "Uploading..."
                      : "Upload Medical Record"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}