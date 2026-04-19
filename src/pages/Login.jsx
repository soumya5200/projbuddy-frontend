import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center relative overflow-hidden">

      {/* 🔵 Bubbles */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
      <div className="bubble bubble-5"></div>
      <div className="bubble bubble-6"></div>
      <div className="bubble bubble-7"></div>
      <div className="bubble bubble-8"></div>
      <div className="bubble bubble-9"></div>
      <div className="bubble bubble-10"></div>

      {/* 🔥 Rectangle Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-xl w-[400px] md:w-[500px] lg:w-[550px] shadow-2xl relative z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500 p-2 mb-4 text-center rounded">
            {error}
          </div>
        )}

        {/* 🔥 Google Button (UI only) */}
        <button
          type="button"
          onClick={() => alert("Google login coming soon")}
          className="w-full mb-4 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-400 mb-4">OR</div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-700"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-gray-700"
          onChange={handleChange}
        />

        {/* Button */}
        <button className="w-full bg-blue-600 py-3 rounded font-semibold">
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-300">
          Don't have an account?
          <Link to="/register" className="text-blue-400 ml-2 hover:underline">
            Register
          </Link>
        </p>
      </form>

      {/* 🔥 Bubble CSS */}
      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.6; }
        }

        .bubble {
          position: absolute;
          border-radius: 9999px;
          background-color: rgba(59, 130, 246, 0.3);
          animation: bubbleFloat 6s infinite ease-in-out;
        }

        .bubble-1 { width: 40px; height: 40px; left: 10%; top: 20%; }
        .bubble-2 { width: 25px; height: 25px; left: 30%; top: 50%; }
        .bubble-3 { width: 50px; height: 50px; left: 60%; top: 30%; }
        .bubble-4 { width: 35px; height: 35px; left: 80%; top: 40%; }
        .bubble-5 { width: 20px; height: 20px; left: 50%; top: 70%; }
        .bubble-6 { width: 45px; height: 45px; left: 20%; top: 80%; }
        .bubble-7 { width: 30px; height: 30px; left: 70%; top: 60%; }
        .bubble-8 { width: 25px; height: 25px; left: 40%; top: 10%; }
        .bubble-9 { width: 50px; height: 50px; left: 90%; top: 20%; }
        .bubble-10 { width: 15px; height: 15px; left: 10%; top: 80%; }
      `}</style>
    </div>
  );
}