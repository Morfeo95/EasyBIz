import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Boxes, FileText } from 'lucide-react';

const Dashboard = ({ businesses, products, estimates, onSelectStat }) => {
  const stats = [
    {
      label: 'Negocios',
      value: businesses.length,
      icon: Briefcase,
      color: 'text-green-600 bg-green-100',
      key: 'businesses',
    },
    {
      label: 'Productos',
      value: products.length,
      icon: Boxes,
      color: 'text-blue-600 bg-blue-100',
      key: 'products',
    },
    {
      label: 'Estimados',
      value: estimates.length,
      icon: FileText,
      color: 'text-purple-600 bg-purple-100',
      key: 'estimados',
    },
  ];

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map(({ label, value, icon: Icon, color, key }, index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ delay: index * 0.1, duration: 0.4, type: 'spring' }}
          className="bg-white p-4 sm:p-5 rounded-2xl shadow-md flex items-center gap-4 sm:gap-6 hover:shadow-lg transition-all cursor-pointer max-[480px]:flex-col max-[480px]:items-start"
          onClick={() => {
            if (onSelectStat) onSelectStat(key);
          }}
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
