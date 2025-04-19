import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Box, FileText, Settings } from 'lucide-react';
import useTranslations from '../../hooks/useTranslations'; // Ajusta la ruta según tu estructura

const Sidebar = ({ active, onSelect }) => {
  // Cargar todas las traducciones
  const messages = useTranslations();

  // Esperar a que lleguen las traducciones del módulo 'perfil'
  if (!messages?.perfil?.sidebar) {
    return <div>Loading...</div>;
  }

  // Extraer las etiquetas desde el JSON cargado
  const labels = messages.perfil.sidebar;

  // Solo definimos key e icon; el label viene de translations
  const navItems = [
    { key: 'dashboard', icon: Home },
    { key: 'businesses', icon: Briefcase },
    { key: 'products', icon: Box },
    { key: 'estimados', icon: FileText },
    { key: 'settings', icon: Settings },
  ];

  return (
    <div className="hidden md:block fixed h-screen">
      <div className="w-64 h-full bg-white/70 backdrop-blur-lg shadow-xl border-r border-gray-200 flex flex-col">
        <div className="p-6 text-2xl font-bold text-green-700 tracking-tight">
          {/* Marca desde translations */}
          {labels.brand}
        </div>
        <nav className="mt-4 flex flex-col gap-1 px-2">
          {navItems.map(({ key, icon: Icon }) => {
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
                {/* Label desde translations */}
                <span>{labels[key]}</span>
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
