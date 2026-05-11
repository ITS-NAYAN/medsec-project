import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    orgId: "",
    full_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerError = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.orgId.trim()) {
      newErrors.orgId = "Required";
    }

    if (mode === "register" && !formData.full_name.trim()) {
      newErrors.full_name = "Required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Select role";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      triggerError();
      return;
    }

    const endpoint =
      mode === "login"
        ? "http://127.0.0.1:8000/auth/login"
        : "http://127.0.0.1:8000/auth/register";

    try {
      setLoading(true);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(
          mode === "register"
            ? {
                organization_id: formData.orgId,
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
              }
            : {
                organization_id: formData.orgId,
                email: formData.email,
                password: formData.password,
                role: formData.role,
              }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.detail || "Authentication failed");
        triggerError();
        setLoading(false);
        return;
      }

      setApiError("");

      if (mode === "register") {
        alert("Registration successful. Please login.");
        setMode("login");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/staff/dashboard");
      }

    } catch {
      setApiError("Network error");
      triggerError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-blue-50
          to-indigo-100
          px-6
          py-16
          flex
          items-center pt-32 md:pt-36
        "
      >

        <div className="max-w-7xl mx-auto w-full">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE */}
            <div className="max-w-xl">

              {/* Badge */}
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
                  mb-8
                "
              >
                🔐 Enterprise Healthcare Security
              </div>

              {/* Heading */}
              <h1
                className="
                  text-5xl
                  lg:text-7xl
                  font-black
                  leading-tight
                  tracking-tight
                  mb-8
                "
              >

                <span className="text-slate-900">
                  Secure
                </span>

                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600
                    text-transparent
                    bg-clip-text
                  "
                >
                  Connected
                </span>

                <br />

                <span className="text-slate-900">
                  Healthcare
                </span>

              </h1>

              {/* Description */}
              <p
                className="
                  text-xl
                  leading-relaxed
                  text-slate-600
                  mb-10
                "
              >
                MedSec enables clinics, doctors, and healthcare
                staff to securely exchange patient records through
                a modern AI-powered healthcare ecosystem.
              </p>

              {/* Features */}
              <div className="space-y-5">

                <div className="flex gap-4">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                      text-2xl
                    "
                  >
                    🔐
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      Zero-Trust Security
                    </h3>

                    <p className="text-slate-500">
                      Role-based access with encrypted healthcare
                      data protection.
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-indigo-100
                      flex
                      items-center
                      justify-center
                      text-2xl
                    "
                  >
                    ⚡
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      High Performance APIs
                    </h3>

                    <p className="text-slate-500">
                      Lightning-fast healthcare workflows and
                      real-time data access.
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-purple-100
                      flex
                      items-center
                      justify-center
                      text-2xl
                    "
                  >
                    🏥
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      Multi-Clinic Infrastructure
                    </h3>

                    <p className="text-slate-500">
                      Unified ecosystem for connected healthcare
                      organizations.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div
              className={`
                relative
                bg-white/90
                backdrop-blur-xl
                border
                shadow-2xl
                rounded-[32px]
                p-10
                transition-all
                duration-300
                ${
                  shake
                    ? "border-red-300 ring-4 ring-red-100"
                    : "border-white/50"
                }
              `}
            >

              {/* Top */}
              <div className="mb-8 text-center">

                <h2
                  className="
                    text-4xl
                    font-black
                    text-slate-900
                    mb-3
                  "
                >
                  {mode === "login"
                    ? "Welcome Back"
                    : "Create Account"}
                </h2>

                <p className="text-slate-500 text-lg">
                  Secure healthcare access portal
                </p>

              </div>

              {/* Error */}
              {apiError && (
                <div
                  className="
                    mb-6
                    bg-red-50
                    border
                    border-red-200
                    text-red-600
                    px-4
                    py-3
                    rounded-2xl
                    text-sm
                    font-medium
                  "
                >
                  ❌ {apiError}
                </div>
              )}

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* ORG ID */}
                <div>
                  <input
                    placeholder="Organization ID"
                    value={formData.orgId}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        orgId: e.target.value,
                      });
                      setApiError("");
                    }}
                    className="
                      w-full
                      px-5
                      py-4
                      rounded-2xl
                      border
                      border-slate-200
                      focus:ring-4
                      focus:ring-blue-100
                      focus:border-blue-500
                      outline-none
                      transition
                    "
                  />
                </div>

                {/* NAME */}
                {mode === "register" && (
                  <div>
                    <input
                      placeholder="Full Name"
                      value={formData.full_name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          full_name: e.target.value,
                        });
                        setApiError("");
                      }}
                      className="
                        w-full
                        px-5
                        py-4
                        rounded-2xl
                        border
                        border-slate-200
                        focus:ring-4
                        focus:ring-blue-100
                        focus:border-blue-500
                        outline-none
                        transition
                      "
                    />
                  </div>
                )}

                {/* EMAIL */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      });
                      setApiError("");
                    }}
                    className="
                      w-full
                      px-5
                      py-4
                      rounded-2xl
                      border
                      border-slate-200
                      focus:ring-4
                      focus:ring-blue-100
                      focus:border-blue-500
                      outline-none
                      transition
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                      setApiError("");
                    }}
                    className="
                      w-full
                      px-5
                      py-4
                      rounded-2xl
                      border
                      border-slate-200
                      focus:ring-4
                      focus:ring-blue-100
                      focus:border-blue-500
                      outline-none
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                      text-blue-600
                      text-sm
                      font-medium
                    "
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

                {/* ROLES */}
                <div className="space-y-3">

                  <p className="text-sm font-semibold text-slate-600">
                    Select Role
                  </p>

                  <div className="grid grid-cols-3 gap-3">

                    {["admin", "doctor", "staff"].map((role) => (
                      <button
                        type="button"
                        key={role}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            role,
                          });

                          setApiError("");
                        }}
                        className={`
                          py-4
                          rounded-2xl
                          font-semibold
                          capitalize
                          transition-all
                          duration-300
                          border
                          ${
                            formData.role === role
                              ? `
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600
                                text-white
                                border-blue-600
                                shadow-lg
                                shadow-blue-500/20
                              `
                              : `
                                bg-white
                                border-slate-200
                                text-slate-600
                                hover:bg-blue-50
                              `
                          }
                        `}
                      >
                        {role}
                      </button>
                    ))}

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    hover:from-blue-700
                    hover:to-indigo-700
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                    text-lg
                    shadow-xl
                    shadow-blue-500/20
                    transition-all
                    duration-300
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Please wait..."
                    : mode === "login"
                    ? "Sign In Securely"
                    : "Create Account"}
                </button>

                {/* TOGGLE */}
                <div className="text-center pt-2">

                  {mode === "login" ? (
                    <p className="text-slate-500">

                      Don&apos;t have an account?{" "}

                      <button
                        type="button"
                        onClick={() => setMode("register")}
                        className="
                          text-blue-600
                          font-semibold
                          hover:text-blue-700
                        "
                      >
                        Register here
                      </button>

                    </p>
                  ) : (
                    <p className="text-slate-500">

                      Already have an account?{" "}

                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="
                          text-blue-600
                          font-semibold
                          hover:text-blue-700
                        "
                      >
                        Login
                      </button>

                    </p>
                  )}

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}