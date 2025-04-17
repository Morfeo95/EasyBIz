// src/components/ProductRegistration.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const ProductRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada a tu API de backend
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al registrar");
      setStatus({ type: "success", msg: "Producto registrado 🎉" });
      setForm({ name: "", price: "", quantity: "", description: "" });
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold text-green-700 mb-6">
        Registrar nuevo producto
      </h3>
      {status && (
        <p
          className={`mb-4 p-3 rounded ${
            status.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.msg}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", label: "Nombre", type: "text" },
          { name: "price", label: "Precio unitario", type: "number" },
          { name: "quantity", label: "Cantidad", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 mb-1">
              {field.label}
            </label>
            <motion.input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        ))}
        <div>
          <label className="block text-gray-700 mb-1">Descripción</label>
          <motion.textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium shadow hover:bg-green-500 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
        >
          Registrar
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ProductRegistration;
