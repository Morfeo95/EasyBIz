import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl shadow-lg w-11/12 max-w-lg p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-600" />
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;