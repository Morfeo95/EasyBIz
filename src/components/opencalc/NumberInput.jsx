// Import React to use JSX and create the component
import React from 'react';
// Import motion from framer-motion to enable animations on the input container
import { motion } from 'framer-motion';

// Define the NumberInput component, accepting props for customization
const NumberInput = ({ 
  label, // Optional text to display above the input as a label
  placeholder, // Placeholder text shown inside the input when empty
  value, // Current value of the input (controlled by parent component)
  onChange, // Function to call when the input value changes
  Icon, // Optional icon component to display inside the input
  ...props // Spread operator to pass additional HTML input attributes (e.g., min, max)
}) => (
  // Outer container using flexbox to stack the label and input vertically
  <div className="flex flex-col">
    {/* Label element displayed above the input, styled with bold text and green color */}
    <label className="mb-1 text-base font-bold font-montserrat text-green-700">
      {label}
    </label>
    {/* Animated wrapper for the input, scales slightly when focused */}
    <motion.div 
      whileFocus={{ scale: 1.02 }} // Animation: scales up to 1.02x size on focus
      className="relative" // Relative positioning to allow absolute positioning of the icon
    >
      {/* Number input field with custom styling and behavior */}
      <input
        type="number" // Restricts input to numeric values
        placeholder={placeholder} // Displays placeholder text when input is empty
        value={value} // Controlled value synced with the parent component
        onChange={onChange} // Calls the provided onChange function on value change
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all no-scrollbar hide-arrow 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-[120px]" 
        // Styling: full width, padding, border, rounded corners, focus ring, no scrollbars, hides default number arrows
        {...props} // Passes additional props like min, max, or step to the input
      />
      {/* Optional icon, displayed on the right side of the input */}
      {Icon && <Icon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />}
      {/* Icon is positioned absolutely, centered vertically with transform, colored green */}
    </motion.div>
  </div>
);

// Export the component so it can be imported and used elsewhere in the application
export default NumberInput;