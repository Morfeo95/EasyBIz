import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { HeartHandshake } from "lucide-react"; // Import HeartHandshake icon from lucide-react
import useTranslations from "../../hooks/useTranslations"; // Custom hook for handling translations

// Define the Footer component
const Footer = () => {
  const messages = useTranslations(); // Fetch translation messages using custom hook

  return (
    // Footer container with animation using Framer Motion
    <motion.footer
      className="bg-gray-100 border-t border-green-200 p-6 mt-8 rounded-2xl shadow-md flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }} // Initial animation state (hidden and shifted down)
      animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
      transition={{ duration: 0.6 }} // Animation duration of 0.6 seconds
    >
      {/* Content container with hover animation */}
      <motion.div
        className="flex items-center gap-2 text-green-700 font-ubuntu text-sm"
        whileHover={{ scale: 1.05 }} // Slight scale-up effect on hover
      >
        <HeartHandshake size={20} className="text-green-500" /> {/* HeartHandshake icon */}
        <span>
          {/* Display copyright with current year and translated rights text */}
          © {new Date().getFullYear()} EasyBiz. 
          {messages?.footer?.rights || "All rights reserved."} 
          {/* Use translated text if available, fallback to default */}
        </span>
      </motion.div>
    </motion.footer>
  );
};

// Export the component for use in other parts of the app
export default Footer;