// src/components/perfil/ProductForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PackagePlus, Calculator, StickyNote } from "lucide-react";
import useTranslations from "../../hooks/useTranslations";
import { fetchProductById } from "../../services/productService";

const ProductForm = ({ productId, businesses, onCreate, onUpdate }) => {
  // Hooks must be called unconditionally
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const messagesAll = useTranslations();
  const messages = messagesAll?.perfil?.productForm;

  const isEdit = Boolean(productId);
  const nameParam = params.get("productName");
  const priceParam = params.get("salePrice");
  const queryEstimadoId = params.get("estimadoId");

  const [negocioId, setNegocioId] = useState(businesses[0]?.id || "");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estimadoId, setEstimadoId] = useState(queryEstimadoId || null);

  // Effects
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const p = await fetchProductById(productId);
        setNegocioId(p.negocioId);
        setNombre(nameParam ?? p.nombre);
        setPrecio(priceParam ?? p.precio.toString());
        setDescripcion(p.descripcion || "");
        setEstimadoId(queryEstimadoId ?? p.estimadoId ?? null);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    })();
  }, [isEdit, productId, nameParam, priceParam, queryEstimadoId]);

  useEffect(() => {
    if (nameParam !== null) setNombre(nameParam);
    if (priceParam !== null) setPrecio(priceParam);
    const est = params.get("estimadoId");
    if (est !== null) setEstimadoId(est);
  }, [nameParam, priceParam, params]);

  useEffect(() => {
    if (!isEdit && businesses.length) {
      setNegocioId(businesses[0].id);
    }
  }, [businesses, isEdit]);

  useEffect(() => {
    if (!isEdit && search) {
      navigate(pathname, { replace: true });
    }
  }, [search, pathname, navigate, isEdit]);

  // Guard: wait for translations
  if (!messages) {
    return <div>Loading...</div>;
  }

  // Destructure translation texts
  const {
    selectBusinessLabel,
    productNameLabel,
    productNamePlaceholder,
    salePriceLabel,
    salePricePlaceholder,
    createEstimadoButton,
    editEstimadoButton,
    estimadoGenerated,
    descriptionLabel,
    descriptionPlaceholder,
    addProductButton,
    updateProductButton
  } = messages;

  // Handlers
  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      negocioId: Number(negocioId),
      nombre: nombre.trim(),
      precio: parseFloat(precio),
      descripcion: descripcion.trim() || null,
      estimadoId: estimadoId ? Number(estimadoId) : null,
      id: isEdit ? Number(productId) : undefined
    };
    try {
      if (isEdit) {
        await onUpdate(data);
      } else {
        await onCreate(data);
      }
      setNombre("");
      setPrecio("");
      setDescripcion("");
      navigate(pathname);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateEstimado = () => {
    const returnUrl = `${window.location.origin}${pathname}`;
    const qp = new URLSearchParams();
    qp.set("returnUrl", returnUrl);
    if (nombre.trim()) qp.set("productName", nombre.trim());
    if (precio.toString().trim()) qp.set("salePrice", precio.toString().trim());
    if (isEdit) qp.set("productId", productId);
    if (estimadoId) qp.set("estimadoId", estimadoId);
    navigate(`/opencalc?${qp.toString()}`);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow"
    >
      <label className="text-sm font-medium text-gray-700">
        {selectBusinessLabel}
      </label>
      <select
        value={negocioId}
        onChange={e => setNegocioId(e.target.value)}
        required
        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {businesses.map(b => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <PackagePlus className="w-4 h-4 text-green-600" /> {productNameLabel}
      </label>
      <input
        type="text"
        placeholder={productNamePlaceholder}
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <label className="text-sm font-medium text-gray-700">
        {salePriceLabel}
      </label>
      <input
        type="number"
        step="0.01"
        placeholder={salePricePlaceholder}
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        required
        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <motion.button
        type="button"
        onClick={handleCreateEstimado}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
      >
        <Calculator className="w-4 h-4" />
        {isEdit ? editEstimadoButton : createEstimadoButton}
      </motion.button>

      {estimadoId && (
        <p className="text-sm text-gray-600">
          {estimadoGenerated} <strong>#{estimadoId}</strong>
        </p>
      )}

      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <StickyNote className="w-4 h-4 text-yellow-500" /> {descriptionLabel}
      </label>
      <textarea
        placeholder={descriptionPlaceholder}
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`px-4 py-2 rounded-lg transition ${
          isEdit
            ? "bg-yellow-600 hover:bg-yellow-500 text-white"
            : "bg-green-600 hover:bg-green-500 text-white"
        } self-start`}
      >
        {isEdit ? updateProductButton : addProductButton}
      </motion.button>
    </motion.form>
  );
};

ProductForm.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {}
};

export default ProductForm;
