import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const Header = ({ user }) => (
  <header className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-md shadow-md border-b border-gray-200 ml-64 max-[1024px]:ml-0 transition-all duration-300 ease-in-out">
    <div className="flex items-center gap-3 pr-4 ml-auto max-[640px]:gap-2 max-[640px]:pr-2">
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="p-2 rounded-full bg-green-100 shadow-inner"
      >
        <User className="w-6 h-6 text-green-600" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-gray-800 font-medium tracking-tight text-sm max-[640px]:text-xs truncate max-w-[120px] sm:max-w-none"
      >
        {user.name || user.email}
      </motion.span>
    </div>
  </header>
);

export default Header;
