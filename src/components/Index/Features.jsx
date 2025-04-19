// src/components/Features.jsx
import React from "react";
import { motion } from "framer-motion";
import { UserPlus, RefreshCcw, Briefcase } from "lucide-react";
import useTranslations from "../../hooks/useTranslations";

const ICONS = [UserPlus, RefreshCcw, Briefcase];

const Features = () => {
  const messages = useTranslations();

  // Guardia de carga
  if (!messages?.index?.features) {
    return <div>Loading...</div>;
  }

  const features = messages.index.features;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((f, i) => {
          const Icon = ICONS[i] || (() => null);
          return (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 shadow-inner">
                <Icon size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
