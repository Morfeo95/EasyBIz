// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import useTranslations from "../../hooks/useTranslations";

// Animación de aparición por letra
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5 }
  }),
};

const Hero = () => {
  const messages = useTranslations();

  // Guardia de carga
  if (!messages?.index?.hero) {
    return <div>Loading...</div>;
  }

  const { title, description } = messages.index.hero;

  return (
    <motion.section
      className="text-center py-24 px-6 bg-gradient-to-br from-white to-green-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Icono animado */}
      <motion.div
        className="inline-flex items-center justify-center bg-green-100 text-green-700 rounded-full w-16 h-16 mb-6 shadow-md"
        initial={{ y: -10 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Briefcase className="w-8 h-8" />
      </motion.div>

      {/* Título animado letra por letra */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-4 flex justify-center flex-wrap gap-1">
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        {description}
      </motion.p>
    </motion.section>
  );
};

export default Hero;
