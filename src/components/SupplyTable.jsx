import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Boxes, CirclePlus, Trash2 } from 'lucide-react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import Button from './Button';
import useTranslations from '../hooks/useTranslations';
import HelpTooltip from './HelpTooltip';

const SupplyTable = ({
  insumos,
  onChange,
  onAdd,
  onDelete,
  totalInsumos,
  timeFrame,
}) => {
  // Llamamos a todos los Hooks de forma incondicional
  const translations = useTranslations();
  const [openAccordion, setOpenAccordion] = useState({});

  // Verificar traducciones después de llamar a los Hooks
  if (!translations) return null;

  const { supplyTable, productInfoForm } = translations;
  const timeFrameText = productInfoForm.timeFrameOptions[timeFrame] || timeFrame;

  // Función para determinar placeholder según la unidad seleccionada
  const getUsedQuantityPlaceholder = (unit) => {
    return supplyTable.placeholders.usedQuantity[unit] || supplyTable.placeholders.usedQuantity.pieza;
  };

  // Función para alternar el estado del acordeón en móvil
  const toggleAccordion = (index) => {
    setOpenAccordion((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <motion.div
      className="bg-white bg-opacity-70 backdrop-blur-md border border-green-200 p-5 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-montserrat font-bold text-green-700 mb-3 flex items-center gap-2">
        <Boxes size={22} className="text-green-500" />
        {supplyTable.title}
        <HelpTooltip text={supplyTable.help.title} />
      </h3>

      {/* Vista de tabla para pantallas medianas en adelante */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left text-sm font-raleway border-separate border-spacing-0">
          <thead className="hidden md:table-header-group">
            <motion.tr className="bg-green-100 text-green-800" whileHover={{ scale: 1.001 }}>
              {Object.values(supplyTable.headers).map((header, idx) => (
                <th key={idx} className="p-3 font-semibold">
                  <div className="flex">
                    {header}
                    <HelpTooltip text={supplyTable.help[Object.keys(supplyTable.headers)[idx]]} />
                  </div>
                </th>
              ))}
              <th className="p-3 w-10"></th>
            </motion.tr>
          </thead>

          <tbody>
            {insumos.map((insumo, index) => (
              <motion.tr
                key={index}
                className="flex flex-col md:table-row border-b last:border-0 hover:bg-gray-50 transition duration-200"
                whileHover={{ scale: 1.001 }}
              >
                <td className="block md:table-cell p-3">
                  <TextInput
                    label={supplyTable.headers.material}
                    value={insumo.material}
                    placeholder={supplyTable.placeholders.material}
                    onChange={(e) => onChange(index, 'material', e.target.value)}
                  />
                </td>
                <td className="block md:table-cell p-3">
                  <NumberInput
                    label={supplyTable.headers.price}
                    placeholder={supplyTable.placeholders.price}
                    value={insumo.price}
                    onChange={(e) => onChange(index, 'price', e.target.value)}
                    Icon={DollarSign}
                  />
                </td>
                <td className="block md:table-cell p-3">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <NumberInput
                      label={supplyTable.headers.netContent}
                      placeholder={supplyTable.placeholders.netContent}
                      value={insumo.netContent}
                      onChange={(e) => onChange(index, 'netContent', e.target.value)}
                      Icon={Boxes}
                    />
                    <div className="flex flex-col">
                      <label className="mb-1 text-base font-bold font-montserrat text-green-700">
                        {insumo.netContentUnit
                          ? supplyTable.unit.options[insumo.netContentUnit]
                          : supplyTable.unit.options.pieza}
                      </label>
                      <select
                        value={insumo.netContentUnit || 'pieza'}
                        onChange={(e) => onChange(index, 'netContentUnit', e.target.value)}
                        className="h-10 w-full border border-gray-200 rounded-md bg-gray-100 text-green-700 focus:ring-2 focus:ring-green-400"
                      >
                        {Object.entries(supplyTable.unit.options).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </td>
                <td className="block md:table-cell p-3">
                  <TextInput
                    label={`${supplyTable.headers.usedQuantity} (${timeFrameText})`}
                    value={insumo.usedQuantity}
                    placeholder={getUsedQuantityPlaceholder(insumo.netContentUnit)}
                    onChange={(e) => onChange(index, 'usedQuantity', e.target.value)}
                  />
                </td>
                <td className="block md:table-cell p-3">
                  <NumberInput
                    label={supplyTable.headers.costPerLot}
                    placeholder={supplyTable.placeholders.costPerLot}
                    value={insumo.costPerPiece}
                    onChange={(e) => onChange(index, 'costPerPiece', e.target.value)}
                    Icon={DollarSign}
                    readOnly
                  />
                </td>
                <td className="block md:table-cell p-3 text-center">
                  <motion.button
                    onClick={() => onDelete(index)}
                    className="text-gray-500 hover:text-red-500"
                    title={supplyTable.deleteTitle}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de acordeón para móvil */}
      <div className="block md:hidden">
        {insumos.map((insumo, index) => (
          <div key={index} className="mb-4 border rounded-lg overflow-hidden">
            {/* Cabecera del acordeón */}
            <motion.div
              onClick={() => toggleAccordion(index)}
              className="bg-green-100 p-3 flex justify-between items-center cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <span className="font-bold">{insumo.material || supplyTable.headers.tableMobile}</span>
              <span className="text-green-700">{insumo.costPerPiece ? `$${insumo.costPerPiece}` : ''}</span>
            </motion.div>
            {/* Contenido del acordeón */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openAccordion[index]
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-3 space-y-4">
                <TextInput
                  label={supplyTable.headers.material}
                  value={insumo.material}
                  placeholder={supplyTable.placeholders.material}
                  onChange={(e) => onChange(index, 'material', e.target.value)}
                />
                <NumberInput
                  label={supplyTable.headers.price}
                  placeholder={supplyTable.placeholders.price}
                  value={insumo.price}
                  onChange={(e) => onChange(index, 'price', e.target.value)}
                  Icon={DollarSign}
                />
                <div className="flex flex-col">
                  <NumberInput
                    label={supplyTable.headers.netContent}
                    placeholder={supplyTable.placeholders.netContent}
                    value={insumo.netContent}
                    onChange={(e) => onChange(index, 'netContent', e.target.value)}
                    Icon={Boxes}
                  />
                  <label className="mt-1 font-bold text-green-700">
                    {insumo.netContentUnit
                      ? supplyTable.unit.options[insumo.netContentUnit]
                      : supplyTable.unit.options.pieza}
                  </label>
                  <select
                    value={insumo.netContentUnit || 'pieza'}
                    onChange={(e) => onChange(index, 'netContentUnit', e.target.value)}
                    className="h-10 w-full border border-gray-200 rounded-md bg-gray-100 text-green-700 focus:ring-2 focus:ring-green-400"
                  >
                    {Object.entries(supplyTable.unit.options).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <TextInput
                  label={`${supplyTable.headers.usedQuantity} (${timeFrameText})`}
                  value={insumo.usedQuantity}
                  placeholder={getUsedQuantityPlaceholder(insumo.netContentUnit)}
                  onChange={(e) => onChange(index, 'usedQuantity', e.target.value)}
                />
                <NumberInput
                  label={supplyTable.headers.costPerLot}
                  placeholder={supplyTable.placeholders.costPerLot}
                  value={insumo.costPerPiece}
                  onChange={(e) => onChange(index, 'costPerPiece', e.target.value)}
                  Icon={DollarSign}
                  readOnly
                />
                <div className="text-center">
                  <motion.button
                    onClick={() => onDelete(index)}
                    className="text-gray-500 hover:text-red-500"
                    whileHover={{ scale: 1.2 }}
                    title={supplyTable.deleteTitle}
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Botón para agregar insumos y mostrar el total */}
      <motion.div
        className="mt-4 flex flex-col md:flex-row justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={onAdd}
          className="flex items-center gap-2 text-green-700 hover:text-green-500"
        >
          <CirclePlus className="w-6 h-6" />
          {supplyTable.addButton}
        </Button>
        <span className="text-lg font-bold text-green-700">
          {supplyTable.total} {totalInsumos.toFixed(2)}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SupplyTable;
