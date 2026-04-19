import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Register() {
const [form, setForm] = useState({
name: "",
email: "",
password: ""
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate();

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
setError("");
};

const handleGoogleLogin = async () => {
try {
const result = await signInWithPopup(auth, provider);
const user = result.user;

await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/google`, {  
    name: user.displayName,  
    email: user.email,  
    picture: user.photoURL,  
  });  

  navigate("/dashboard");  
} catch (error) {  
  setError("Google Login Failed");  
}

};

const validate = () => {
if (!form.name || !form.email || !form.password) {
return "All fields are required";
}
if (!/\S+@\S+.\S+/.test(form.email)) {
return "Invalid email format";
}
if (form.password.length < 6) {
return "Password must be at least 6 characters";
}
return "";
};

const handleSubmit = async (e) => {
e.preventDefault();
const validationError = validate();
if (validationError) return setError(validationError);

try {  
  setLoading(true);  

  const res = await axios.post(  
    `${import.meta.env.VITE_APP_BASE_URL}/api/auth/register`,  
    form  
  );  

  if (res.status === 200) {  
    navigate("/login");  
  }  
} catch (err) {  
  setError(err.response?.data?.message || "Registration Failed");  
} finally {  
  setLoading(false);  
}

};

return (
<div className="min-h-screen bg-gray-900 text-white flex justify-center items-center relative overflow-hidden">
{/* 🔵 Floating bubbles */}
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

{/* Form */}  
  <form  
    onSubmit={handleSubmit}  
    className="bg-gray-800/80 p-10 rounded-2xl w-[90%] max-w-md shadow-2xl"  
  >  
    <h2 className="text-3xl font-bold text-center mb-6">  
      Create Account  
    </h2>  

    {error && (  
      <div className="bg-red-500 p-2 mb-4 text-center rounded">  
        {error}  
      </div>  
    )}  

    {/* Google Button */}  
    <button  
      type="button"  
      onClick={handleGoogleLogin}  
      className="w-full mb-4 bg-white text-black py-2 rounded-lg font-semibold"  
    >  
      Continue with Google  
    </button>  

    <div className="text-center text-gray-400 mb-4">OR</div>  

    <input  
      type="text"  
      name="name"  
      placeholder="Name"  
      className="w-full p-3 mb-4 rounded bg-gray-700"  
      onChange={handleChange}  
    />  

    <input  
      type="email"  
      name="email"  
      placeholder="Email"  
      className="w-full p-3 mb-4 rounded bg-gray-700"  
      onChange={handleChange}  
    />  

    <input  
      type={showPassword ? "text" : "password"}  
      name="password"  
      placeholder="Password"  
      className="w-full p-3 mb-4 rounded bg-gray-700"  
      onChange={handleChange}  
    />  

    <button className="w-full bg-blue-600 py-3 rounded">  
      {loading ? "Registering..." : "Register"}  
    </button>

    <p className="text-center text-gray-400 mt-4">  
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline"  
          onClick={() => navigate("/login")}  
          >  
            Login  
          </Link>  
        </p>  </form>

{/* 🔥 Bubble styles */}
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
    .bubble-5 { width: 45px; height: 45px; left: 15%; top: 60%; }  
    .bubble-6 { width: 30px; height: 30px; left: 45%; top: 10%; }  
    .bubble-7 { width: 55px; height: 55px; left: 75%; top: 70%; }  
    .bubble-8 { width: 25px; height: 25px; left: 20%; top: 80%; }  
    .bubble-9 { width: 40px; height: 40px; left: 50%; top: 90%; }  
    .bubble-10 { width: 35px; height: 35px; left: 85%; top: 20%; }  

  `}</style>  

</div>

);
}