import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization_id: "",
    full_name: "",
    email: "",
    password: "",
    role: "admin"
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Registration failed");
        return;
      }

      alert("Admin registered successfully!");
      navigate("/login");

    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Admin Registration
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">

            <input
              placeholder="Organization ID"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, organization_id: e.target.value })
              }
            />

            <input
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Register Admin
            </button>

          </form>
        </div>
      </section>
    </>
  );
}