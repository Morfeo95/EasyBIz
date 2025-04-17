// src/components/perfil/BusinessSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import BusinessList from './BusinessList';

const BusinessSection = ({ businesses, openModal, onEditBusiness, onDeleteBusiness }) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="p-6 max-[640px]:p-4"
  >
    <div className="flex justify-between items-center mb-6 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-4">
      <h2 className="text-2xl font-bold text-gray-800 max-[480px]:text-xl">Tus negocios</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-500 transition-all max-[480px]:w-full max-[480px]:justify-center"
      >
        <PlusCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Agregar</span>
      </motion.button>
    </div>
    <BusinessList
      businesses={businesses}
      onEditBusiness={onEditBusiness}
      onDeleteBusiness={onDeleteBusiness}
    />
  </motion.section>
);

export default BusinessSection;
