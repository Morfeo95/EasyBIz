import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion for animations and AnimatePresence for exit animations
import { BarChart3, Heart, X } from "lucide-react"; // Import icons from lucide-react
import useTranslations from "../hooks/useTranslations"; // Custom hook for handling translations
import LanguageSwitcher from "./LanguageSwitcher"; // Component for language selection
import Donations from "./Donations"; // Component for donation options

// Define the Nav component
const Nav = () => {
  // Fetch translation messages using custom hook
  const messages = useTranslations();
  // State to control the visibility of the donations modal
  const [showDonations, setShowDonations] = useState(false);

  // Show loading message if translations aren't available yet
  if (!messages) return <div>Loading...</div>;

  // Destructure navigation and donation text from translations
  const { brand, links } = messages.nav;
  const { donate } = messages.donations;

  return (
    <>
      {/* Navigation bar */}
      <nav className="bg-gray-100 border-b border-green-200 p-6 shadow-lg rounded-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          {/* Brand/logo section with animation */}
          <motion.div
            className="flex items-center space-x-2 mb-4 sm:mb-0"
            initial={{ opacity: 0, y: -10 }} // Initial animation state (hidden and shifted up)
            animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
            transition={{ duration: 0.5 }} // Animation duration
          >
            <BarChart3 className="text-green-700" size={32} /> {/* BarChart icon */}
            <h1 className="text-3xl font-bold text-green-700 hover:text-green-500 transition-colors duration-300">
              {brand} {/* Translated brand name */}
            </h1>
          </motion.div>

          {/* Navigation links */}
         { /*<ul className="flex flex-wrap justify-center space-x-6 font-medium text-lg mb-4 sm:mb-0">
            {Object.entries(links).map(([key, label]) => (
              <motion.li
                key={key} // Unique key for each link
                className="cursor-pointer transition-transform duration-200 hover:text-green-500" // Styling and hover effect
                whileHover={{ scale: 1.1, opacity: 0.8 }} // Scale and fade on hover
              >
                {label} {/* Translated link label /}
              </motion.li>
            ))}
          </ul>*/}

          {/* Language switcher and donation button */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher /> {/* Language selection component */}
            <motion.button
              onClick={() => setShowDonations(true)} // Show donations modal on click
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-500 transition-colors duration-200"
              whileHover={{ scale: 1.05 }} // Slight scale-up on hover
            >
              <Heart size={20} /> {/* Heart icon */}
              {donate} {/* Translated "Donate" text */}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Donations modal with animation */}
      <AnimatePresence> {/* Enables exit animations for conditional rendering */}
        {showDonations && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" // Overlay covering the screen
            initial={{ opacity: 0 }} // Initial animation state (transparent)
            animate={{ opacity: 1 }} // Final animation state (visible)
            exit={{ opacity: 0 }} // Exit animation (fade out)
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg relative w-11/12 max-w-md" // Modal container
              initial={{ scale: 0.8 }} // Initial animation state (scaled down)
              animate={{ scale: 1 }} // Final animation state (normal size)
              exit={{ scale: 0.8 }} // Exit animation (scale down)
              transition={{ duration: 0.3 }} // Animation duration
            >
              <motion.button
                onClick={() => setShowDonations(false)} // Close modal on click
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" // Close button styling
                whileHover={{ scale: 1.1 }} // Scale up on hover
              >
                <X size={24} /> {/* Close (X) icon */}
              </motion.button>
              <Donations /> {/* Render the Donations component inside the modal */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Export the component for use in other parts of the app
export default Nav;