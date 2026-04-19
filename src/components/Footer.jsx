import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-0 border-t border-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h3 className="text-xl font-bold text-blue-400 mb-4">
            ProjBuddy
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            ProjBuddy is a real-time collaboration platform where developers
            can code together, share files, chat, and work on projects
            simultaneously in a shared coding environment.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>

          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="hover:text-blue-400 transition">
                Register
              </Link>
            </li>

            <li>
              <Link to="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📧 support@projbuddy.com</li>
            <li>📍 Lucknow, India</li>
            <li>📞 +91 98765 43210</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">🌐 GitHub</li>
            <li className="hover:text-blue-400 cursor-pointer">💼 LinkedIn</li>
            <li className="hover:text-blue-400 cursor-pointer">🐦 Twitter</li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center border-t border-gray-800 py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} ProjBuddy. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;