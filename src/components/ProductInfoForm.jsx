import React from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import { Boxes, DollarSign, Percent, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import useTranslations from '../hooks/useTranslations';
import HelpTooltip from './HelpTooltip';

const ProductInfoForm = ({
  currency,
  onCurrencyChange,
  productName,
  producedUnits,
  timeFrame,
  gainPercentage,
  onProductChange,
  onUnitsChange,
  onTimeFrameChange,
  onGainChange,
}) => {
  const messages = useTranslations();
  if (!messages)
    return <div className="text-green-700 font-bold">Cargando...</div>;

  const { productInfoForm } = messages;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5 bg-white bg-opacity-80 border border-green-200 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Selección de Moneda */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <DollarSign size={18} className="text-green-500" />
          {productInfoForm.currency}
          <HelpTooltip text={productInfoForm.help.currency} />
        </label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition-all duration-200 shadow-sm"
        >
          {["MXN", "USD", "CAD", "EUR", "ARS", "BRL", "CLP", "COP"].map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Nombre del Producto */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center">
          {productInfoForm.productName}
          <HelpTooltip text={productInfoForm.help.productName} />
        </label>
        <TextInput
          placeholder={productInfoForm.productNamePlaceholder}
          value={productName}
          onChange={onProductChange}
          className="shadow-sm"
        />
      </motion.div>

      {/* Unidades Producidas */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <Boxes size={18} className="text-green-500" />
          {productInfoForm.producedUnits}
          <HelpTooltip text={productInfoForm.help.producedUnits} />
        </label>
        <NumberInput
          placeholder={productInfoForm.producedUnitsPlaceholder}
          value={producedUnits}
          onChange={onUnitsChange}
        />
      </motion.div>

      {/* Selección del Plazo de Tiempo */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <Calendar size={18} className="text-green-500" />
          {productInfoForm.timeFrame}
          <HelpTooltip text={productInfoForm.help.timeFrame} />
        </label>
        <select
          value={timeFrame}
          onChange={onTimeFrameChange}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition-all duration-200 shadow-sm"
        >
          <option value="week">
            {productInfoForm.timeFrameOptions.week}
          </option>
          <option value="twoWeeks">
            {productInfoForm.timeFrameOptions.twoWeeks}
          </option>
          <option value="month">
            {productInfoForm.timeFrameOptions.month}
          </option>
        </select>
      </motion.div>

      {/* Porcentaje de Ganancia */}
      <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }}>
        <label className="mb-2 text-sm font-bold text-green-700 flex items-center gap-2">
          <Percent size={18} className="text-green-500" />
          {productInfoForm.gainPercentage}
          <HelpTooltip text={productInfoForm.help.gainPercentage} />
        </label>
        <NumberInput
          placeholder={productInfoForm.gainPercentagePlaceholder}
          value={gainPercentage}
          onChange={onGainChange}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductInfoForm;
