// src/components/perfil/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Boxes, FileText } from 'lucide-react';
import useTranslations from '../../hooks/useTranslations';

const ICONS = {
  businesses: Briefcase,
  products:   Boxes,
  estimados:  FileText
};
const COLORS = {
  businesses: 'text-green-600 bg-green-100',
  products:   'text-blue-600 bg-blue-100',
  estimados:  'text-purple-600 bg-purple-100'
};

const Dashboard = ({ businesses, products, estimates, onSelectStat }) => {
  const messages = useTranslations();

  // Guardia de carga
  if (!messages?.perfil?.dashboard?.stats) {
    return <div>Loading...</div>;
  }

  // Obtenemos labels desde JSON
  const statsConfig = messages.perfil.dashboard.stats;

  // Creamos la lista de stats dinámicamente
  const stats = statsConfig.map(({ key, label }) => ({
    key,
    label,
    value: {
      businesses: businesses.length,
      products:   products.length,
      estimados:  estimates.length
    }[key],
    icon: ICONS[key],
    color: COLORS[key]
  }));

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map(({ key, label, value, icon: Icon, color }, index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ delay: index * 0.1, duration: 0.4, type: 'spring' }}
          className="bg-white p-4 sm:p-5 rounded-2xl shadow-md flex items-center gap-4 sm:gap-6 hover:shadow-lg transition-all cursor-pointer max-[480px]:flex-col max-[480px]:items-start"
          onClick={() => onSelectStat?.(key)}
        >
          <div className={`p-3 rounded-full shrink-0 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex flex-col max-[480px]:mt-2 max-[480px]:items-start">
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;
