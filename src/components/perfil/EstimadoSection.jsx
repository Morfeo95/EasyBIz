// src/components/perfil/EstimadoSection.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PencilLine, Trash2, FilePlus2 } from 'lucide-react';
import useTranslations from '../../hooks/useTranslations';

const EstimadoSection = ({ estimates, onDeleteEstimado }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const msg = useTranslations()?.perfil?.estimadoSection;

  // Guardia de carga
  if (!msg) return <div>Loading...</div>;

  const {
    icon,
    title,
    noItems,
    labels: { units, days, profit },
    createdPrefix,
    buttons: { edit, delete: del, add }
  } = msg;

  const handleRedirectToOpenCalc = estimado => {
    const params = new URLSearchParams();
    if (estimado) {
      params.set('estimadoId', estimado.id);
      params.set('productName', estimado.nombre || '');
    }
    params.set('returnUrl', location.pathname);
    navigate(`/opencalc?${params.toString()}`);
  };

  const formatFecha = fecha => {
    if (!fecha) return '';
    return new Date(fecha).toLocaleString();
  };

  return (
    <section className="p-6 max-[640px]:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        {icon} {title}
      </h2>

      {estimates.length === 0 ? (
        <p className="text-gray-500 text-sm">{noItems}</p>
      ) : (
        <div className="space-y-4">
          {estimates.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white rounded-xl shadow-md flex justify-between items-start max-[480px]:flex-col max-[480px]:gap-3"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{e.nombre}</h3>
                <p className="text-sm text-gray-600">
                  {e.unidadesProducidas} {units} • {e.plazo} {days} • {e.ganancia}% {profit}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {createdPrefix} {formatFecha(e.fecha)}
                </p>
              </div>
              <div className="flex gap-3 max-[480px]:self-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleRedirectToOpenCalc(e)}
                  className="text-blue-600 hover:text-blue-700 transition flex items-center gap-1 text-sm"
                >
                  <PencilLine className="w-4 h-4" />
                  {edit}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onDeleteEstimado(e.id)}
                  className="text-red-600 hover:text-red-700 transition flex items-center gap-1 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  {del}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleRedirectToOpenCalc()}
        className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow transition-all max-[480px]:w-full max-[480px]:justify-center"
      >
        <FilePlus2 className="w-5 h-5" />
        <span className="text-sm font-medium">{add}</span>
      </motion.button>
    </section>
  );
};

export default EstimadoSection;
