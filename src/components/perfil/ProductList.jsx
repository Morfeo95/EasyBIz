import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  StickyNote,
  Trash2,
  CalendarDays,
  Pencil,
} from "lucide-react";

const ProductList = ({ products, onDelete }) => {
  const navigate = useNavigate();

  if (!products.length) {
    return (
      <p className="text-gray-600 italic text-center">
        Aún no tienes productos registrados.
      </p>
    );
  }

  return (
    <ul className="mb-4 grid gap-4">
      {products.map((p, index) => (
        <motion.li
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow p-4 border border-gray-100 hover:shadow-md transition-all"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Package className="w-5 h-5 text-green-700 shrink-0" />
              <span className="text-lg font-semibold text-green-700 truncate">
                {p.nombre}
              </span>
            </div>

            <span className="text-base font-bold text-gray-900">
              ${p.precio.toFixed(2)}
            </span>

            <button
              onClick={() => onDelete(p.id)}
              className="text-red-600 hover:text-red-800 transition p-1"
              title="Eliminar producto"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            {p.estimadoId && (
              <button
                onClick={() => {
                  const returnUrl = window.location.pathname;
                  const qp = new URLSearchParams();
                  qp.set("estimadoId", p.estimadoId);
                  qp.set("productId", p.id);
                  qp.set("productName", p.nombre);
                  qp.set("salePrice", p.precio.toFixed(2));
                  qp.set("returnUrl", returnUrl);
                  navigate(`/opencalc?${qp.toString()}`);
                }}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
              >
                <Pencil className="w-4 h-4" />
                Editar estimado
              </button>
            )}
          </div>

          {p.descripcion && (
            <div className="text-sm text-gray-500 flex items-start gap-2 mb-2">
              <StickyNote className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
              <span className="break-words">{p.descripcion}</span>
            </div>
          )}

          <div className="text-xs text-gray-500 flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Creado: {new Date(p.fechaDeCreacion).toLocaleString()}
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

export default ProductList;
