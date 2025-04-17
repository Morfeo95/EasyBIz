import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Box, FileText, Settings } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'businesses', label: 'Negocios', icon: Briefcase },
  { key: 'products', label: 'Productos', icon: Box },
  { key: 'estimados', label: 'Estimados', icon: FileText },
  { key: 'settings', label: 'Ajustes', icon: Settings },
];

const Sidebar = ({ active, onSelect }) => {
  return (
    <div className="hidden md:block fixed h-screen">
      <div className="w-64 h-full bg-white/70 backdrop-blur-lg shadow-xl border-r border-gray-200 flex flex-col">
        <div className="p-6 text-2xl font-bold text-green-700 tracking-tight">
          EasyBiz<span className="text-green-500">Tools</span>
        </div>
        <nav className="mt-4 flex flex-col gap-1 px-2">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <motion.button
                key={key}
                onClick={() => onSelect(key)}
                initial={false}
                animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-green-100 text-green-800 font-semibold'
                    : 'hover:bg-green-50 text-gray-700'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? 'text-green-600'
                      : 'text-gray-500 group-hover:text-green-600'
                  }`}
                />
                <span>{label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeSidebar"
                    className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-r"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
