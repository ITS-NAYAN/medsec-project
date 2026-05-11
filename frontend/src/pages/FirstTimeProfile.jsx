import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Navbar from "../components/Navbar";

export default function FirstTimeProfile() {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    accepted: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Phone (India: 10 digits, starts 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    // Department
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    // Policy
    if (!formData.accepted) {
      newErrors.accepted = "You must accept the policy to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Profile data valid:", formData);
      // ✅ TEMP: simulate user role = doctor
      navigate("/doctor/dashboard"); // Redirect after form submission
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-sm border">

          <h2 className="text-2xl font-semibold text-slate-800 mb-2 text-center">
            Complete Your Profile
          </h2>

          <p className="text-sm text-slate-600 text-center mb-6">
            Please provide the following details to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-slate-700">Contact Number</label>
              <input
                type="tel"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="text-sm font-medium text-slate-700">Department</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
              {errors.department && (
                <p className="text-xs text-red-500 mt-1">{errors.department}</p>
              )}
            </div>

            {/* Policy */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFormData({ ...formData, accepted: e.target.checked })
                }
              />
              <p className="text-xs text-slate-600">
                I agree to MedSec data access and privacy policies
              </p>
            </div>
            {errors.accepted && (
              <p className="text-xs text-red-500">{errors.accepted}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Continue to Dashboard
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
