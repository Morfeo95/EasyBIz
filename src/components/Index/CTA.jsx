// src/components/CTA.jsx
import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-white to-green-50 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        ¿Listo para optimizar tu negocio?
      </motion.h2>

      <motion.p
        className="text-gray-600 text-lg max-w-xl mx-auto mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Empieza ahora con <strong>OpenCalc</strong> y lleva tus finanzas al siguiente nivel.
      </motion.p>

      <motion.button
        onClick={() => navigate("/opencalc")}
        className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-green-500 transition active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <BarChart3 size={24} />
        </motion.div>
        Empieza con OpenCalc
      </motion.button>
    </motion.section>
  );
};

export default CTA;
