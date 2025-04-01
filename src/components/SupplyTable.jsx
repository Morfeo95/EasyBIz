// Import React library for building UI components
import React from "react";
// Import motion component for animations from the framer-motion library
import { motion } from "framer-motion";
// Import icons used in this component from the lucide-react library
import { DollarSign, Boxes, CirclePlus, Trash2 } from "lucide-react";
// Import custom TextInput component for text fields
import TextInput from "./TextInput";
// Import custom NumberInput component for numeric fields
import NumberInput from "./NumberInput";
// Import a Button component for interactive actions
import Button from "./Button";
// Import custom hook for translations to support multiple languages
import useTranslations from "../hooks/useTranslations";

// Define the SupplyTable component which handles a list of supply items
const SupplyTable = ({ insumos, onChange, onAdd, onDelete, totalInsumos, timeFrame }) => {
  // Retrieve translation messages using the custom useTranslations hook
  const translations = useTranslations();
  // If translations haven't loaded yet, return nothing (or null) to avoid rendering incomplete UI
  if (!translations) return null;

  // Destructure necessary translation texts from the translations object
  const { supplyTable, productInfoForm } = translations;
  // Get the text for the selected time frame using the translation object; fallback to the timeFrame prop if not found
  const timeFrameText = productInfoForm.timeFrameOptions[timeFrame] || timeFrame;

  // Helper function to get the placeholder text for the "used quantity" input based on the unit
  const getUsedQuantityPlaceholder = (unit) => {
    return supplyTable.placeholders.usedQuantity[unit] || supplyTable.placeholders.usedQuantity.pieza;
  };

  return (
    // Main container with motion animation for appearance
    <motion.div
      className="bg-white bg-opacity-70 backdrop-blur-md border border-green-200 p-5 rounded-xl shadow-md"
      // Initial animation state: slightly transparent and shifted down
      initial={{ opacity: 0, y: 10 }}
      // Animate to fully visible and in original position
      animate={{ opacity: 1, y: 0 }}
      // Transition duration for the animation effect
      transition={{ duration: 0.5 }}
    >
      {/* Table title with an icon */}
      <h3 className="text-xl font-montserrat font-bold text-green-700 mb-3 flex items-center gap-2">
        <Boxes size={22} className="text-green-500" />
        {supplyTable.title}
      </h3>
      
      {/* Wrapper for the table to allow horizontal scrolling on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-raleway border-separate border-spacing-0">
          {/* Table header is hidden on small screens and visible on medium and larger screens */}
          <thead className="hidden md:table-header-group">
            <motion.tr className="bg-green-100 text-green-800" whileHover={{ scale: 1.001 }}>
              {/* Map through header values to create table headers */}
              {Object.values(supplyTable.headers).map((header, idx) => (
                <th key={idx} className="p-3 font-semibold">{header}</th>
              ))}
              {/* Extra empty header cell for the delete button column */}
              <th className="p-3 w-10"></th>
            </motion.tr>
          </thead>
          
          {/* Table body containing a row for each supply item */}
          <tbody>
            {insumos.map((insumo, index) => (
              <motion.tr
                key={index}
                // Use flex layout on small screens and table row on larger screens
                className="flex flex-col md:table-row border-b last:border-0 hover:bg-gray-50 transition duration-200"
                // Slight scaling effect on hover for better interactivity
                whileHover={{ scale: 1.001 }}
              >
                {/* Material column with a text input */}
                <td className="block md:table-cell p-3">
                  <TextInput
                    label={supplyTable.headers.material}
                    value={insumo.material}
                    placeholder={supplyTable.placeholders.material}
                    // Update the material field for the current supply item
                    onChange={(e) => onChange(index, "material", e.target.value)}
                  />
                </td>
                {/* Price column with a number input and a dollar icon */}
                <td className="block md:table-cell p-3">
                  <NumberInput
                    label={supplyTable.headers.price}
                    placeholder={supplyTable.placeholders.price}
                    value={insumo.price}
                    // Update the price field for the current supply item
                    onChange={(e) => onChange(index, "price", e.target.value)}
                    Icon={DollarSign}
                  />
                </td>
                {/* Net Content column with number input and a unit selector */}
                <td className="block md:table-cell p-3">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    {/* Input for net content */}
                    <NumberInput
                      label={supplyTable.headers.netContent}
                      placeholder={supplyTable.placeholders.netContent}
                      value={insumo.netContent}
                      // Update the net content value for the current supply item
                      onChange={(e) => onChange(index, "netContent", e.target.value)}
                      Icon={Boxes}
                    />
                    {/* Dropdown for selecting the net content unit */}
                    <div className="flex flex-col">
                      <label className="mb-1 text-base font-bold font-montserrat text-green-700">
                        {/* Display the translated unit, defaulting to "pieza" if not provided */}
                        {insumo.netContentUnit
                          ? supplyTable.unit.options[insumo.netContentUnit]
                          : supplyTable.unit.options.pieza}
                      </label>
                      <select
                        value={insumo.netContentUnit || "Pieza"}
                        // Update the net content unit for the current supply item
                        onChange={(e) => onChange(index, "netContentUnit", e.target.value)}
                        className="h-10 w-full border border-gray-200 rounded-md bg-gray-100 text-green-700 focus:ring-2 focus:ring-green-400"
                      >
                        {/* Create an option for each available unit */}
                        {Object.entries(supplyTable.unit.options).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </td>
                {/* Used Quantity column with a text input; includes the time frame in the label */}
                <td className="block md:table-cell p-3">
                  <TextInput
                    // Concatenate header label with the time frame text
                    label={`${supplyTable.headers.usedQuantity} (${timeFrameText})`}
                    value={insumo.usedQuantity}
                    // Set placeholder dynamically based on the unit of net content
                    placeholder={getUsedQuantityPlaceholder(insumo.netContentUnit)}
                    // Update the used quantity field for the current supply item
                    onChange={(e) => onChange(index, "usedQuantity", e.target.value)}
                  />
                </td>
                {/* Cost Per Lot column with a read-only number input */}
                <td className="block md:table-cell p-3">
                  <NumberInput
                    label={supplyTable.headers.costPerLot}
                    placeholder={supplyTable.placeholders.costPerLot}
                    value={insumo.costPerPiece}
                    // Update not allowed on this field; it's calculated from other data
                    onChange={(e) => onChange(index, "costPerPiece", e.target.value)}
                    Icon={DollarSign}
                    readOnly
                  />
                </td>
                {/* Delete button column to remove the current supply item */}
                <td className="block md:table-cell p-3 text-center">
                  <motion.button
                    // Call onDelete with the index of the current supply item when clicked
                    onClick={() => onDelete(index)}
                    className="text-gray-500 hover:text-red-500"
                    title={supplyTable.deleteTitle}
                    // Increase size slightly on hover for interactivity
                    whileHover={{ scale: 1.2 }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Section for the "Add Supply" button and total supplies display */}
      <motion.div
        className="mt-4 flex flex-col md:flex-row justify-between items-center"
        // Fade in animation with a slight delay for a smooth appearance
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Button to add a new supply item */}
        <Button onClick={onAdd} className="flex items-center gap-2 text-green-700 hover:text-green-500">
          <CirclePlus className="w-6 h-6" />
          {supplyTable.addButton}
        </Button>
        {/* Display the total of supplies */}
        <span className="text-lg font-bold text-green-700">
          {supplyTable.total} {totalInsumos.toFixed(2)}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Export the SupplyTable component for use in other parts of the application
export default SupplyTable;
