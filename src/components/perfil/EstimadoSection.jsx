import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PencilLine, Trash2, FilePlus2 } from 'lucide-react';

const EstimadoSection = ({ estimates, onDeleteEstimado }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirectToOpenCalc = (estimado) => {
    const params = new URLSearchParams();
    if (estimado) {
      params.set('estimadoId', estimado.id);
      params.set('productName', estimado.nombre || '');
    }
    params.set('returnUrl', location.pathname);
    navigate(`/opencalc?${params.toString()}`);
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return date.toLocaleString();
  };

  return (
    <section className="p-6 max-[640px]:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">📊 Estimados</h2>

      {estimates.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay estimados aún.</p>
      ) : (
        <div className="space-y-4">
          {estimates.map((estimado) => (
            <motion.div
              key={estimado.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white rounded-xl shadow-md flex justify-between items-start max-[480px]:flex-col max-[480px]:gap-3"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{estimado.nombre}</h3>
                <p className="text-sm text-gray-600">
                  {estimado.unidadesProducidas} unidades • {estimado.plazo} días • {estimado.ganancia}% ganancia
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Creado: {formatFecha(estimado.fecha)}
                </p>
              </div>
              <div className="flex gap-3 max-[480px]:self-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleRedirectToOpenCalc(estimado)}
                  className="text-blue-600 hover:text-blue-700 transition flex items-center gap-1 text-sm"
                >
                  <PencilLine className="w-4 h-4" />
                  Editar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onDeleteEstimado(estimado.id)}
                  className="text-red-600 hover:text-red-700 transition flex items-center gap-1 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
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
        <span className="text-sm font-medium">Agregar estimado</span>
      </motion.button>
    </section>
  );
};

export default EstimadoSection;
