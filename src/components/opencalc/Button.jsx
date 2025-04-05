import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.005, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="w-full border border-green-500 text-green-500
                flex justify-center gap-2 
                 rounded-full px-6 py-2 font-montserrat 
                 focus:outline-none shadow-md transition-all 
                 hover:shadow-lg"
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;