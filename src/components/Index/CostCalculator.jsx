// src/components/CostCalculator.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const CostCalculator = () => {
  const [inputs, setInputs] = useState({
    cost: "",
    markup: "",
    quantity: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculate = (e) => {
    e.preventDefault();
    const cost = parseFloat(inputs.cost) || 0;
    const markup = parseFloat(inputs.markup) || 0;
    const qty = parseInt(inputs.quantity) || 0;
    const unitPrice = cost + (cost * markup) / 100;
    const total = unitPrice * qty;
    setResult({ unitPrice, total });
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold text-green-700 mb-6">
        Calculadora de costos
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        {[
          { name: "cost", label: "Costo base (USD)", type: "number" },
          { name: "markup", label: "Margen (%)", type: "number" },
          { name: "quantity", label: "Cantidad", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 mb-1">
              {field.label}
            </label>
            <motion.input
              type={field.type}
              name={field.name}
              value={inputs[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        ))}
        <motion.button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium shadow hover:bg-green-500 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
        >
          Calcular
        </motion.button>
      </form>

      {result && (
        <motion.div
          className="mt-6 p-4 bg-green-50 rounded-lg text-green-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>Precio unitario: <strong>${result.unitPrice.toFixed(2)}</strong></p>
          <p>Total: <strong>${result.total.toFixed(2)}</strong></p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CostCalculator;
