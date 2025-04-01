import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { DollarSign, CirclePlus, Trash2, FileText } from "lucide-react"; // Import icons from lucide-react
import TextInput from "./TextInput"; // Custom component for text input
import NumberInput from "./NumberInput"; // Custom component for number input
import Button from "./Button"; // Custom button component
import useTranslations from "../hooks/useTranslations"; // Custom hook for handling translations

// Define the ExpenseTable component with props for managing expenses
const ExpenseTable = ({ 
  gastos, // Array of expense objects (name, monthlyCost)
  onChange, // Function to update an expense field
  onAdd, // Function to add a new expense
  onDelete, // Function to delete an expense by index
  totalPlantCost // Total calculated cost to display
}) => {
  // Retrieve translation messages using the custom hook
  const translations = useTranslations();
  if (!translations) return null; // Return null if translations aren't loaded yet

  // Destructure the 'expenseTable' object from translations for localized text
  const { expenseTable } = translations;

  return (
    // Main container with animation using Framer Motion
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-md border border-green-200 p-5 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }} // Initial animation state (hidden and shifted down)
      animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in place)
      transition={{ duration: 0.5 }} // Animation duration
    >
      {/* Section title with icon */}
      <h3 className="text-xl font-montserrat font-bold text-green-700 mb-3 flex items-center gap-2">
        <FileText size={22} className="text-green-500" /> {/* FileText icon */}
        {expenseTable.title} {/* Translated title */}
      </h3>
      
      {/* Table container with horizontal scrolling for small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-raleway border-separate border-spacing-0">
          {/* Table header (hidden on mobile, visible on medium screens and up) */}
          <thead className="hidden md:table-header-group">
            <motion.tr
              className="flex flex-col md:table-row bg-green-100 text-green-800"
              whileHover={{ scale: 1.01 }} // Slight scale animation on hover
            >
              <th className="block md:table-cell p-3 w-1/2 font-semibold">
                {expenseTable.headers.description} {/* Translated description header */}
              </th>
              <th className="block md:table-cell p-3 w-1/2 font-semibold">
                {expenseTable.headers.monthlyCost} {/* Translated monthly cost header */}
              </th>
              <th className="block md:table-cell p-3 w-10"></th> {/* Empty column for delete button */}
            </motion.tr>
          </thead>
          {/* Table body with expense rows */}
          <tbody>
            {gastos.map((gasto, index) => (
              <motion.tr
                key={index} // Unique key for each row
                className="flex flex-col md:table-row border-b last:border-0 hover:bg-gray-50 transition duration-200"
                whileHover={{ scale: 1.01 }} // Slight scale animation on hover
              >
                {/* Description column */}
                <td className="block md:table-cell p-3">
                  <label className="mb-1 text-base font-bold font-montserrat text-green-700">{expenseTable.headers.description}</label>
                  <TextInput
                    value={gasto.name} // Current expense name
                    placeholder={expenseTable.placeholders.description} // Translated placeholder
                    onChange={(e) => onChange(index, "name", e.target.value)} // Update name on change
                    className="w-full" // Full width input
                  />
                </td>
                {/* Monthly cost column */}
                <td className="block md:table-cell p-3">
                  <label className="mb-1 text-base font-bold font-montserrat text-green-700">{expenseTable.headers.monthlyCost}</label>
                  <NumberInput
                    value={gasto.monthlyCost} // Current monthly cost
                    placeholder={expenseTable.placeholders.monthlyCost} // Translated placeholder
                    onChange={(e) => onChange(index, "monthlyCost", e.target.value)} // Update cost on change
                    Icon={DollarSign} // Dollar sign icon
                  />
                </td>
                {/* Delete button column */}
                <td className="block md:table-cell p-3 text-center">
                  <motion.button
                    onClick={() => onDelete(index)} // Delete expense at this index
                    className="text-gray-500 hover:text-red-500" // Color change on hover
                    title={expenseTable.deleteTitle} // Translated tooltip
                    whileHover={{ scale: 1.2 }} // Scale up on hover
                  >
                    <Trash2 className="w-5 h-5" /> {/* Trash icon */}
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer with add button and total cost */}
      <motion.div
        className="mt-4 flex flex-col md:flex-row justify-between items-center"
        initial={{ opacity: 0 }} // Initial animation state (hidden)
        animate={{ opacity: 1 }} // Final animation state (visible)
        transition={{ delay: 0.3 }} // Delayed animation
      >
        {/* Add expense button */}
        <Button 
          onClick={onAdd} // Trigger add function
          className="flex items-center gap-2 text-green-700 hover:text-green-500" // Styling
        >
          <CirclePlus className="w-6 h-6" /> {/* Plus icon */}
          {expenseTable.addButton} {/* Translated button text */}
        </Button>
        {/* Total cost display */}
        <span className="text-lg font-bold text-green-700">
          {expenseTable.total} {totalPlantCost.toFixed(2)} {/* Translated total label with formatted cost */}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Export the component for use in other parts of the app
export default ExpenseTable;