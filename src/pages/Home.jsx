import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCode, FaRobot, FaRocket, FaStar, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const features = [
        { icon: FaCode, title: "Real-time Code Editing", desc: "Collaborate live with Socket.io sync." },
        { icon: FaUsers, title: "Add Collaborators", desc: "Invite team, manage access easily." },
        { icon: FaRobot, title: "AI Code Generation", desc: "Generate code via prompts instantly." },
        { icon: FaRocket, title: "Chat & Updates", desc: "In-app messaging and version control." }
    ];

    const testimonials = [
        { name: "Dev1", text: "Best collab tool for MERN projects!", rating: 5 },
        { name: "CoderPro", text: "AI feature saved hours!", rating: 5 },
        { name: "TeamLead", text: "Production-ready dashboard.", rating: 5 }
    ];

    const pricing = [
        { name: "Free", price: "$0/mo", features: ["Basic Editing", "1 Collaborator", "Limited AI"], popular: false },
        { name: "Pro", price: "$9/mo", features: ["Unlimited Everything", "AI Unlimited", "Priority Support"], popular: true }
    ];

    return (

        <div className=" bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">

            {/* 🔵 BUBBLES */}
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

            {/* ✅ NAVBAR FIXED */}
            <nav className="fixed top-0 w-full bg-gray-900/70 backdrop-blur-md z-50 py-4 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

                    <h1 className="text-2xl font-bold text-blue-400">
                        ProjBuddy
                    </h1>

                    <div className="space-x-6 hidden md:flex items-center">

                        <Link to="/" className="hover:text-blue-400 transition">
                            Home
                        </Link>

                        <Link to="/login" className="hover:text-blue-400 transition">
                            Login
                        </Link>

                        <Link to="/register" className="hover:text-blue-400 transition">
                            Register
                        </Link>

                        <Link to="/dashboard" className="hover:text-blue-400 transition">
                            Dashboard
                        </Link>

                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center relative z-10">

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                    Real-time Code <span className="text-blue-400 drop-shadow-lg">Collaboration</span>
                </motion.h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Build with team, AI code generation and live chat. Perfect platform for MERN developers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    <Link
                        to="/register"
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:scale-105 transition"
                    >
                        Start Coding Free
                    </Link>

                    <Link
                        to="/login"
                        className="border-2 border-blue-500 px-12 py-4 rounded-full text-xl hover:bg-blue-500 hover:text-white transition"
                    >
                        Login
                    </Link>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-800">

                    <div className="bg-gray-800/60 p-6 rounded-xl shadow-md hover:scale-105 transition">
                        <FaRocket className="text-3xl text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold">10K+</div>
                        <div>Users</div>
                    </div>

                    <div className="bg-gray-800/60 p-6 rounded-xl shadow-md hover:scale-105 transition">
                        <FaCode className="text-3xl text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold">50K+</div>
                        <div>Projects</div>
                    </div>

                    <div className="bg-gray-800/60 p-6 rounded-xl shadow-md hover:scale-105 transition">
                        <FaStar className="text-3xl text-yellow-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold">4.9</div>
                        <div>Rating</div>
                    </div>

                    <div className="bg-gray-800/60 p-6 rounded-xl shadow-md hover:scale-105 transition">
                        <FaUsers className="text-3xl text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold">100+</div>
                        <div>Teams</div>
                    </div>

                </div>

            </section>

            {/* FEATURES */}
            <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">

                <h2 className="text-4xl font-bold text-center mb-20">
                    Platform Features
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {features.map((feature, i) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-center p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-700 transition"
                            >
                                <Icon className="text-5xl text-blue-400 mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-300">{feature.desc}</p>
                            </motion.div>
                        )
                    })}

                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 px-4 bg-gray-900/50 relative z-10">

                <h2 className="text-4xl font-bold text-center mb-12">
                    What Developers Say
                </h2>

                <div className="max-w-4xl mx-auto space-y-8">

                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="p-8 bg-gray-800 rounded-2xl"
                        >
                            <p className="text-lg mb-4">"{t.text}"</p>

                            <div className="flex justify-between items-center">
                                <h4 className="font-bold">{t.name}</h4>

                                <div className="flex">
                                    {Array(t.rating).fill().map((_, j) => (
                                        <FaStar key={j} className="text-yellow-400" />
                                    ))}
                                </div>

                            </div>
                        </motion.div>
                    ))}

                </div>
            </section>

            {/* PRICING */}
            <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">

                <h2 className="text-4xl font-bold text-center mb-20">
                    Pricing
                </h2>

                <div className="grid md:grid-cols-2 gap-8">

                    {pricing.map((plan, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className={`relative p-10 rounded-3xl bg-gray-800 border-2 ${plan.popular ? "border-blue-500" : "border-gray-700"
                                }`}
                        >

                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 px-6 py-2 rounded-full text-sm">
                                    Popular
                                </div>
                            )}

                            <h3 className="text-3xl font-bold mb-6">{plan.name}</h3>
                            <div className="text-4xl font-bold mb-8">{plan.price}</div>

                            <ul className="space-y-3 mb-10">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center">
                                        <FaCheck className="text-green-400 mr-2" /> {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigate("/register")}
                                className="w-full py-3 bg-blue-600 rounded-full hover:bg-blue-700"
                            >
                                Get Started
                            </button>

                        </motion.div>
                    ))}

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center relative z-10">

                <h2 className="text-4xl font-bold mb-6">
                    Ready to Collaborate?
                </h2>

                <p className="text-gray-300 mb-10">
                    Join thousands of developers using ProjBuddy.
                </p>

                <button
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 px-12 py-4 rounded-full text-xl hover:scale-105 transition"
                >
                    Create Account
                </button>

            </section>

            {/* 🔥 BUBBLE CSS */}
            <style>{`
@keyframes bubbleFloat {
  0% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-30px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.5; }
}

.bubble {
  position: absolute;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(59,130,246,0.5), transparent);
  animation: bubbleFloat 8s infinite ease-in-out;
  filter: blur(2px);
}

.bubble-1 { width: 40px; height: 40px; left: 10%; top: 20%; }
.bubble-2 { width: 25px; height: 25px; left: 30%; top: 50%; }
.bubble-3 { width: 50px; height: 50px; left: 60%; top: 30%; }
.bubble-4 { width: 35px; height: 35px; left: 80%; top: 40%; }
.bubble-5 { width: 45px; height: 45px; left: 15%; top: 60%; }
.bubble-6 { width: 30px; height: 30px; left: 45%; top: 10%; }
.bubble-7 { width: 55px; height: 55px; left: 75%; top: 70%; }
.bubble-8 { width: 25px; height: 25px; left: 20%; top: 80%; }
.bubble-9 { width: 40px; height: 40px; left: 50%; top: 50%; }
.bubble-10 { width: 30px; height: 30px; left: 70%; top: 20%; }
`}</style>

        </div>
    );
};

export default Home;