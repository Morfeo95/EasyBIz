import React from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import { PieChart } from 'lucide-react'; // Import PieChart icon from lucide-react
import GraficaPastel from './GraficaPastel'; // Import custom pie chart component
import useTranslations from '../hooks/useTranslations'; // Custom hook for handling translations

// Define the GraphSection component with props for chart data
const GraphSection = ({ 
  insumos, // Array of input materials data for the pie chart
  gastosPlanta // Array of plant expenses data for the pie chart
}) => {
  // Fetch translation messages using custom hook
  const messages = useTranslations();
  // Show loading message if translations aren't available yet
  if (!messages) return <div className="text-green-700 font-bold">Loading...</div>;

  return (
    // Main container with animation using Framer Motion
    <motion.div
      className="md:col-span-1 bg-white bg-opacity-80 backdrop-blur-lg border border-green-200 p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 10 }} // Initial animation state (hidden and shifted down)
      animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
      whileHover={{ scale: 1.03 }} // Slight scale-up effect on hover
      transition={{ duration: 0.5 }} // Animation duration of 0.5 seconds
    >
      {/* Section title with icon */}
      <h3 className="text-xl font-montserrat font-bold text-green-700 flex items-center gap-2 mb-4">
        <PieChart size={24} className="text-green-500" /> {/* PieChart icon */}
        {messages.graphSection.title} {/* Translated title from messages */}
      </h3>
      {/* Container for the pie chart component */}
      <div className="flex items-center justify-center">
        <GraficaPastel 
          insumos={insumos} // Pass insumos data to GraficaPastel
          gastosPlanta={gastosPlanta} // Pass gastosPlanta data to GraficaPastel
        />
      </div>
    </motion.div>
  );
};

// Export the component for use in other parts of the app
export default GraphSection;