// Import React library for building UI components
import React from "react";

// Import custom components for text and number inputs
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";

// Import icons from the lucide-react library for visual elements in the form
import { Boxes, DollarSign, Percent, Calendar } from "lucide-react";

// Import motion for animation effects from the framer-motion library
import { motion } from "framer-motion";

// Import custom hook for translations to support multilingual text in the form
import useTranslations from "../hooks/useTranslations";

// Define the ProductInfoForm component with various props to manage form state and events
const ProductInfoForm = ({
  currency,
  onCurrencyChange,
  productName,
  producedUnits,
  timeFrame,
  gainPercentage,
  onProductChange,
  onUnitsChange,
  onTimeFrameChange,
  onGainChange,
}) => {
  // Use the custom translations hook to retrieve language-specific messages
  const messages = useTranslations();
  // If translations are not loaded, show a loading indicator
  if (!messages)
    return <div className="text-green-700 font-bold">Cargando...</div>;

  // Destructure the productInfoForm messages for easier access to labels and placeholders
  const { productInfoForm } = messages;

  return (
    // motion.div provides an animated container for the form using framer-motion
    <motion.div
      className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5 bg-white bg-opacity-80 border border-green-200 rounded-xl shadow-md"
      // Set initial animation state: transparent and slightly shifted down
      initial={{ opacity: 0, y: 10 }}
      // Animate to fully opaque and original position
      animate={{ opacity: 1, y: 0 }}
      // Transition duration for the animation effect
      transition={{ duration: 0.5 }}
    >
      {/* Currency Selection Field */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        {/* Label with an icon and translated text for currency */}
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <DollarSign size={18} className="text-green-500" />
          {productInfoForm.currency}
        </label>
        {/* Dropdown for selecting the currency */}
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition-all duration-200 shadow-sm"
        >
          {/* Map through an array of supported currencies to create options */}
          {["MXN", "USD", "CAD", "EUR", "ARS", "BRL", "CLP", "COP"].map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Product Name Input Field */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        {/* Label for product name */}
        <label className="mb-2 text-sm font-bold text-green-700">
          {productInfoForm.productName}
        </label>
        {/* Custom TextInput component to capture the product name */}
        <TextInput
          placeholder={productInfoForm.productNamePlaceholder}
          value={productName}
          onChange={onProductChange}
          className="shadow-sm"
        />
      </motion.div>

      {/* Produced Units Input Field */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        {/* Label with an icon for the produced units field */}
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <Boxes size={18} className="text-green-500" />
          {productInfoForm.producedUnits}
        </label>
        {/* Custom NumberInput component to capture the number of produced units */}
        <NumberInput
          placeholder={productInfoForm.producedUnitsPlaceholder}
          value={producedUnits}
          onChange={onUnitsChange}
        />
      </motion.div>

      {/* Time Frame Selection Field */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        {/* Label with an icon for the time frame field */}
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <Calendar size={18} className="text-green-500" />
          {productInfoForm.timeFrame}
        </label>
        {/* Dropdown for selecting the time frame */}
        <select
          value={timeFrame}
          onChange={onTimeFrameChange}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition-all duration-200 shadow-sm"
        >
          {/* Options for different time frames with translated labels */}
          <option value="week">
            {productInfoForm.timeFrameOptions.week}
          </option>
          <option value="twoWeeks">
            {productInfoForm.timeFrameOptions.twoWeeks}
          </option>
          <option value="month">
            {productInfoForm.timeFrameOptions.month}
          </option>
        </select>
      </motion.div>

      {/* Gain Percentage Input Field */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        {/* Label with an icon for the gain percentage field */}
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <Percent size={18} className="text-green-500" />
          {productInfoForm.gainPercentage}
        </label>
        {/* Custom NumberInput component to capture the gain percentage */}
        <NumberInput
          placeholder={productInfoForm.gainPercentagePlaceholder}
          value={gainPercentage}
          onChange={onGainChange}
        />
      </motion.div>
    </motion.div>
  );
};

// Export the component so it can be imported and used in other parts of the application
export default ProductInfoForm;
