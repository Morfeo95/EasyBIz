import React from "react";
import { motion } from "framer-motion";
import { UserPlus, RefreshCcw, Briefcase } from "lucide-react";

const features = [
  {
    title: "Registro de usuarios",
    icon: UserPlus,
    desc: "Crea una cuenta y accede a todas tus herramientas desde un solo lugar.",
  },
  {
    title: "Edición de cotizaciones antiguas",
    icon: RefreshCcw,
    desc: "Modifica tus cotizaciones previas gracias a la integración con la API.",
  },
  {
    title: "Gestión de negocios y productos",
    icon: Briefcase,
    desc: "Administra tus negocios, productos y cotizaciones desde tu perfil.",
  },
];

const Features = () => (
  <section className="py-20 bg-gradient-to-b from-white to-green-50">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
      {features.map((f, i) => (
        <motion.div
          key={i}
          className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 shadow-inner">
            <f.icon size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-3">{f.title}</h3>
          <p className="text-gray-600 leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Features;
