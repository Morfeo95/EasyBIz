import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Heart } from "lucide-react"; // Import Heart icon from lucide-react
import useTranslations from "../hooks/useTranslations"; // Custom hook for handling translations

// Define the Donations component
const Donations = () => {
  const translations = useTranslations(); // Fetch translation data using custom hook
  
  // Return null (render nothing) if translations aren't loaded yet
  if (!translations) return null;
  
  // Destructure the 'donations' object from translations for localized text
  const { donations } = translations;

  return (
    // Main container with animation using Framer Motion
    <motion.div
      className="bg-white bg-opacity-80 border border-green-200 p-6 rounded-2xl shadow-lg flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }} // Initial animation state (hidden and shifted down)
      animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
      transition={{ duration: 0.6 }} // Animation duration of 0.6 seconds
    >
      {/* Header section with icon and title */}
      <div className="flex items-center gap-2">
        <Heart size={24} className="text-green-500" /> {/* Heart icon */}
        <h2 className="text-2xl font-bold text-green-700">{donations.title}</h2> {/* Translated title */}
      </div>
      
      {/* Container for donation buttons */}
      <div className="flex items-center gap-4">
        {/* Ko-fi donation button */}
        <a
          href="https://ko-fi.com/X8X81CMDC3" // Link to Ko-fi donation page
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security attributes to prevent tabnabbing
          className="transition duration-200 hover:scale-105" // Hover effect with scale animation
        >
          <img
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6" // Ko-fi button image
            alt={donations.koFiAlt} // Translated alt text for accessibility
            style={{ border: 0, height: "36px" }} // Inline styles for image (no border, fixed height)
          />
        </a>

        {/* Patreon donation button with animation */}
        <motion.a
          href="https://patreon.com/OpenForge_?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" // Link to Patreon page
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security attributes
          className="px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-500 transition duration-200" // Styling for button
          whileHover={{ scale: 1.05 }} // Scale up slightly on hover using Framer Motion
        >
          {donations.patreonButton} {/* Translated button text */}
        </motion.a>
      </div>
    </motion.div>
  );
};

// Export the component for use elsewhere in the app
export default Donations;