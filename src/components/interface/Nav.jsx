// src/components/Nav.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Heart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useTranslations from "../../hooks/useTranslations";
import LanguageSwitcher from "../opencalc/LanguageSwitcher";
import Donations from "../opencalc/Donations";
import AuthModal from "../login/AuthModal";

const Nav = () => {
  const messages = useTranslations();
  const navigate = useNavigate();
  const [showDonations, setShowDonations] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  if (!messages) return <div>Loading...</div>;

  const { brand, links } = messages.nav;
  const { donate } = messages.donations;

  return (
    <>
      <nav className="bg-gray-100 border-b border-green-200 p-6 shadow-lg rounded-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          {/* Logo + Brand */}
          <motion.div
            className="mb-4 sm:mb-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <BarChart3 className="text-green-700" size={32} />
              <h1 className="text-3xl font-bold text-green-700 hover:text-green-500 transition-colors duration-300">
                {brand}
              </h1>
            </Link>
          </motion.div>

          {/* Links */}
          <ul className="flex flex-wrap justify-center space-x-6 font-medium text-lg mb-4 sm:mb-0">
            {Object.entries(links).map(([key, label]) => (
              <motion.li
                key={key}
                className="cursor-pointer transition-transform duration-200 hover:text-green-500"
                whileHover={{ scale: 1.1, opacity: 0.8 }}
                onClick={() => {
                  if (key === "Login") {
                    setShowAuth(true);
                  } else if (key === "home") {
                    navigate("/");
                  } else if (key === "Profile"){
                    navigate("/profile")
                  }
                  
                  else {
                    // Si tienes rutas para otros links, ajusta aquí:
                    navigate(`/${key.toLowerCase()}`);
                  }
                }}
              >
                {label}
              </motion.li>
            ))}
          </ul>

          {/* Language + Donate */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <motion.button
              onClick={() => setShowDonations(true)}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-500 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <Heart size={20} />
              {donate}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Modal Donations */}
      <AnimatePresence>
        {showDonations && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg relative w-11/12 max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setShowDonations(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                whileHover={{ scale: 1.1 }}
              >
                <X size={24} />
              </motion.button>
              <Donations />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Auth */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthModal onClose={() => setShowAuth(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
