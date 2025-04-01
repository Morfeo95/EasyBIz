import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Calendar, DollarSign, LineChart, Boxes } from "lucide-react"; // Import icons from lucide-react
import NumberInput from "./NumberInput"; // Custom component for number inputs
import useTranslations from "../hooks/useTranslations"; // Custom hook for handling translations

// Define the DailyExpenses component with props for managing state
const DailyExpenses = ({
  workDays, // Number of work days
  setWorkDays, // Function to update workDays
  costPerDay, // Cost per day (calculated or static)
  dailyAvg, // Daily average value
  setDailyAvg, // Function to update dailyAvg
  localCost, // Local cost value
  setLocalCost, // Function to update localCost
  productionCost, // Production cost value
  totalCost, // Total cost (calculated)
  plantCost, // Plant cost (used as fallback for costPerDay)
}) => {
  const messages = useTranslations(); // Fetch translation messages using custom hook

  // Show loading state if translations aren't available yet
  if (!messages) {
    return (
      <div className="text-center text-green-700 font-bold">Loading...</div>
    );
  }

  // Destructure translation labels for use in the UI
  const {
    title, // Section title
    workDays: workDaysLabel, // Label for work days input
    costPerDay: costPerDayLabel, // Label for cost per day
    dailyAvg: dailyAvgLabel, // Label for daily average
    localCost: localCostLabel, // Label for local cost
    productionCost: productionCostLabel, // Label for production cost
    totalCost: totalCostLabel, // Label for total cost
    workDaysPlaceholder, // Placeholder for work days input
    dailyAvgPlaceholder, // Placeholder for daily average input
    localCostPlaceholder, // Placeholder for local cost input
    productionCostPlaceholder, // Placeholder for production cost input
  } = messages.dailyExpenses;

  return (
    // Main container with animation using Framer Motion
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-md border border-green-200 p-4 sm:p-5 rounded-xl shadow-md w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 10 }} // Initial animation state (hidden and shifted down)
      animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
      transition={{ duration: 0.5 }} // Animation duration
    >
      {/* Section title with icon */}
      <h3 className="text-lg sm:text-xl font-montserrat font-bold text-green-700 mb-4 flex items-center gap-2">
        <LineChart size={20} className="text-green-500 sm:size-22" /> {/* Chart icon */}
        {title} {/* Translated title */}
      </h3>

      {/* Grid layout for work days and cost per day inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Work days input section with hover animation */}
        <motion.div whileHover={{ scale: 1.02 }} className="w-full">
          <label className="text-sm font-bold text-green-700 flex items-center gap-2 mb-1">
            <Calendar size={16} className="text-green-500 sm:size-18" /> {/* Calendar icon */}
            {workDaysLabel} {/* Translated label */}
          </label>
          <NumberInput
            placeholder={workDaysPlaceholder} // Translated placeholder
            value={workDays} // Current value
            onChange={(e) => setWorkDays(e.target.value)} // Update state on change
          />
        </motion.div>
        {/* Cost per day display (read-only) */}
        <motion.div whileHover={{ scale: 1.02 }} className="w-full">
          <label className="text-sm font-bold text-green-700 mb-1 block">
            {costPerDayLabel} {/* Translated label */}
          </label>
          <input
            type="text"
            value={workDays ? costPerDay : plantCost} // Show costPerDay if workDays exist, otherwise plantCost
            readOnly // Non-editable field
            className="bg-gray-100 text-gray-700 p-2 sm:p-3 rounded-md w-full shadow-sm"
          />
        </motion.div>
      </div>

      {/* Daily average input section with hover animation */}
      <motion.div whileHover={{ scale: 1.02 }} className="mb-6 w-full">
        <label className="text-sm font-bold text-green-700 mb-1 block">
          {dailyAvgLabel} {/* Translated label */}
        </label>
        <NumberInput
          placeholder={dailyAvgPlaceholder} // Translated placeholder
          value={dailyAvg} // Current value
          onChange={(e) => setDailyAvg(e.target.value)} // Update state on change
          Icon={Boxes} // Icon for the input
        />
      </motion.div>

      {/* Table for local cost, production cost, and total cost */}
      <motion.div
        whileHover={{ scale: 1.02 }} // Hover animation for the table
        className="overflow-x-auto rounded-lg border border-green-200"
      >
        <table className="w-full text-left text-sm font-raleway bg-green-50 min-w-[300px]">
          <thead>
            <tr className="bg-green-200 text-green-900">
              <th className="p-2 sm:p-3 whitespace-nowrap">{localCostLabel}</th> {/* Table header */}
              <th className="p-2 sm:p-3 whitespace-nowrap">{productionCostLabel}</th>
              <th className="p-2 sm:p-3 whitespace-nowrap">{totalCostLabel}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white hover:bg-gray-50 transition">
              {/* Local cost input */}
              <td className="p-2 sm:p-3">
                <NumberInput
                  placeholder={localCostPlaceholder} // Translated placeholder
                  value={localCost} // Current value
                  onChange={(e) => setLocalCost(e.target.value)} // Update state on change
                  Icon={DollarSign} // Dollar sign icon
                />
              </td>
              {/* Production cost input (read-only in this case) */}
              <td className="p-2 sm:p-3">
                <NumberInput
                  placeholder={productionCostPlaceholder} // Translated placeholder
                  value={productionCost} // Current value
                  onChange={() => {}} // No-op function (read-only effect)
                  Icon={DollarSign} // Dollar sign icon
                />
              </td>
              {/* Total cost display (read-only) */}
              <td className="p-2 sm:p-3">
                <input
                  type="text"
                  value={totalCost} // Calculated total cost
                  readOnly // Non-editable field
                  className="bg-gray-100 text-gray-700 p-2 sm:p-3 rounded-md w-full min-w-[120px] shadow-sm"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

// Export the component for use in other parts of the app
export default DailyExpenses;
