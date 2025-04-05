// Import React for creating components
import React from 'react';
// Import motion for adding animation effects to components
import { motion } from 'framer-motion';
// Import the Edit3 icon from lucide-react to indicate editability
import { Edit3 } from 'lucide-react';

// Define a functional component called TextInput which accepts label, placeholder, value, and onChange as props
const TextInput = ({ label, placeholder, value, onChange }) => (
  // Container for the label and input field arranged vertically
  <div className="flex flex-col">
    {/* Label for the input field with styling */}
    <label className="mb-1 text-base font-bold font-montserrat text-green-700">
      {label}
    </label>
    {/* Wrapper for the input field that applies a slight scale effect when focused */}
    <motion.div whileFocus={{ scale: 1.02 }} className="relative">
      {/* Standard text input with placeholder, current value, and an onChange event handler */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
      />
      {/* Edit icon positioned absolutely within the input container */}
      <Edit3 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 transition-all hover:scale-110" />
    </motion.div>
  </div>
);

// Export the TextInput component for use in other parts of the application
export default TextInput;
