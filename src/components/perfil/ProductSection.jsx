import React from 'react';
import ProductList from './ProductList';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductSection = ({ products, openModal, onDeleteProduct }) => {
  return (
    <section className="p-6 max-[640px]:p-4">
      <div className="flex justify-between items-center mb-6 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-4">
        <h2 className="text-2xl sm:text-2xl font-bold text-gray-800 max-[480px]:text-xl">
          📦 Tus productos
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('product')}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow transition-all max-[480px]:w-full max-[480px]:justify-center"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-sm">Agregar</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ProductList products={products} onDelete={onDeleteProduct} />
      </motion.div>
    </section>
  );
};

export default ProductSection;
