import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const OpenCalcAccess = () => {
  return (
    <Link to="/opencalc">
      <motion.div
        className="inline-flex items-center gap-3 bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-xl hover:bg-green-600 transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.span
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <BarChart3 size={22} />
        </motion.span>
        Acceder a <span className="hidden sm:inline">OpenCalc</span>
      </motion.div>
    </Link>
  );
};

export default OpenCalcAccess;
