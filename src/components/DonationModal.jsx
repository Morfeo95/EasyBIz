import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DonationModal = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenDonationModal');
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenDonationModal', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-center text-lg mb-4">{message}</p>
        <button
          onClick={closeModal}
          className="block mx-auto bg-green-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </motion.div>
    </div>
  );
};

export default DonationModal;
