import React from "react";
import { Pie } from "react-chartjs-2"; // Import Pie chart component from react-chartjs-2
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"; // Import Chart.js components
import { ChartPie, Factory } from "lucide-react"; // Import icons from lucide-react
import { motion } from "framer-motion"; // Import motion for animations
import useTranslations from "../hooks/useTranslations"; // Custom hook for handling translations

// Register Chart.js components for rendering pie charts
Chart.register(ArcElement, Tooltip, Legend);

// Define the GraficaPastel component with props for input data
const GraficaPastel = ({ 
  insumos, // Array of input materials with material name and cost per piece
  gastosPlanta // Array of plant expenses with name and monthly cost
}) => {
  // Fetch translation messages using custom hook
  const messages = useTranslations();
  // Show loading message if translations aren't available yet
  if (!messages)
    return <div className="text-green-700 font-bold">Loading...</div>;

  // Destructure translated titles from messages
  const { insumosTitle, plantExpensesTitle } = messages.graficaPastel;

  // Extract labels and data for the insumos pie chart
  const insumosLabels = insumos.map((item) => item.material || "No Name"); // Use material name or fallback
  const insumosData = insumos.map((item) => parseFloat(item.costPerPiece) || 0); // Convert cost to float, default to 0

  // Extract labels and data for the gastosPlanta pie chart
  const gastosLabels = gastosPlanta.map((item) => item.name || "No Name"); // Use expense name or fallback
  const gastosData = gastosPlanta.map((item) => parseFloat(item.monthlyCost) || 0); // Convert cost to float, default to 0

  // Function to generate distinct colors for chart slices based on item count
  const generateColors = (count) =>
    Array.from({ length: count }, (_, idx) => `hsl(${(idx * 50) % 360}, 70%, 50%)`);
    // Uses HSL color space with varying hue for each slice

  // Chart options for customization
  const options = {
    responsive: true, // Make chart responsive to container size
    maintainAspectRatio: false, // Allow chart to fill container height
    plugins: {
      legend: {
        position: "bottom", // Place legend below the chart
        labels: {
          font: {
            family: "Montserrat, sans-serif", // Custom font for legend
            size: 14, // Font size
            color: "#065f46", // Text color (dark green)
          },
        },
      },
    },
  };

  return (
    // Main container with flex layout to stack charts vertically
    <div className="flex flex-col gap-8 p-4 max-w-full overflow-hidden">
      {/* Insumos pie chart */}
      <motion.div
        className="w-full h-64 p-4 bg-white bg-opacity-90 backdrop-blur-md border border-green-200 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 10 }} // Initial animation state (hidden and shifted down)
        animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
        whileHover={{ scale: 1.02 }} // Slight scale-up on hover
        transition={{ duration: 0.5 }} // Animation duration
      >
        <h3 className="text-xl font-bold text-green-700 font-ubuntu mb-2 flex items-center gap-2">
          <ChartPie size={22} className="text-green-500" /> {/* Pie chart icon */}
          {insumosTitle} {/* Translated title for insumos */}
        </h3>
        <div className="w-full h-full">
          <Pie
            data={{
              labels: insumosLabels, // Labels for each slice
              datasets: [
                {
                  data: insumosData, // Data values for each slice
                  backgroundColor: generateColors(insumosLabels.length), // Dynamic colors
                  hoverOffset: 6, // Offset on hover for visual effect
                },
              ],
            }}
            options={options} // Apply chart customization options
          />
        </div>
      </motion.div>

      {/* Gastos Planta pie chart */}
      <motion.div
        className="w-full h-64 p-4 bg-white bg-opacity-90 backdrop-blur-md border border-green-200 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 10 }} // Initial animation state (hidden and shifted down)
        animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
        whileHover={{ scale: 1.02 }} // Slight scale-up on hover
        transition={{ duration: 0.5 }} // Animation duration
      >
        <h3 className="text-xl font-bold text-green-700 font-ubuntu mb-2 flex items-center gap-2">
          <Factory size={22} className="text-green-500" /> {/* Factory icon */}
          {plantExpensesTitle} {/* Translated title for plant expenses */}
        </h3>
        <div className="w-full h-full">
          <Pie
            data={{
              labels: gastosLabels, // Labels for each slice
              datasets: [
                {
                  data: gastosData, // Data values for each slice
                  backgroundColor: generateColors(gastosLabels.length), // Dynamic colors
                  hoverOffset: 6, // Offset on hover for visual effect
                },
              ],
            }}
            options={options} // Apply chart customization options
          />
        </div>
      </motion.div>
    </div>
  );
};

// Export the component for use in other parts of the app
export default GraficaPastel;