import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Edit2, Trash2 } from 'lucide-react';
import useTranslations from '../../hooks/useTranslations';

const BusinessList = ({ businesses, onEditBusiness, onDeleteBusiness }) => {
  // Hook de traducciones al inicio para mantener orden
  const messages = useTranslations();

  // Guardar hooks antes de cualquier return condicional
  if (!messages?.perfil?.businessList) {
    return <div>Loading...</div>;
  }

  // Extraer textos de traducción
  const {
    noItems,
    buttons: { edit: editText, delete: deleteText }
  } = messages.perfil.businessList;

  if (businesses.length === 0) {
    return (
      <div className="flex items-center text-gray-500 gap-2 mt-4">
        <Building2 className="w-5 h-5" />
        <p className="text-sm">{noItems}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-[480px]:gap-4">
      <AnimatePresence>
        {businesses.map((b, i) => (
          <motion.li
            key={b.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col sm:flex-row sm:items-center gap-4 max-[480px]:p-3"
          >
            {b.urlPhoto ? (
              <img
                src={b.urlPhoto}
                alt={b.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400 border">
                <Building2 className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-lg truncate max-[480px]:text-base">
                {b.name}
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEditBusiness(b)}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Edit2 className="w-4 h-4" /> {editText}
              </button>
              <button
                onClick={() => onDeleteBusiness(b.id)}
                className="flex items-center gap-1 text-red-600 hover:underline"
              >
                <Trash2 className="w-4 h-4" /> {deleteText}
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default BusinessList;
