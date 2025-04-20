// src/components/ResultsSection.jsx
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FileText, DollarSign, Layers } from 'lucide-react';
import PDFReportButton from './PDFReportButton';
import useTranslations from '../../hooks/useTranslations';
import HelpTooltip from './HelpTooltip';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ResultsSection = ({ results, gastosPlanta, insumos, productName, currency, onSave }) => {
  const [isPlantCostOpen, setIsPlantCostOpen] = useState(false);
  const messages = useTranslations();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!messages)
    return <div className="text-green-700 font-bold">Cargando...</div>;

  // Desestructuración de textos y valores de resultados
  const { header, cards, plantCostDetails, suppliesDetails } = messages.opencalc.resultsSection;
  const {
    costElaboration,
    monthlyPlantCost,
    fixedCostTotal,
    dailyUnitCost,
    performance,
    saleUnitCost,
    gainPercentage,
    salePrice,
    gain,
  } = results;

  // Configuración de las tarjetas de resultados
  const resultCards = [
    { label: cards.costElaboration, value: costElaboration, showCurrency: true, help: cards.help.costElaboration },
    { label: cards.fixedCostTotal, value: monthlyPlantCost, showCurrency: true, help: cards.help.fixedCostTotal },
    { label: cards.dailyUnitCost, value: dailyUnitCost, showCurrency: true, help: cards.help.dailyUnitCost },
    { label: cards.performance, value: performance, showCurrency: false, help: cards.help.performance },
    { label: cards.saleUnitCost, value: saleUnitCost, showCurrency: true, help: cards.help.saleUnitCost },
    { label: cards.gainPercentage, value: `${gainPercentage}%`, showCurrency: false, help: cards.help.gainPercentage },
    { label: cards.salePrice, value: salePrice, showCurrency: true, help: cards.help.salePrice },
    { label: cards.gain, value: gain, showCurrency: true, help: cards.help.gain }
  ];

  // Función para manejar el clic en "Guardar estimado"
  const handleSaveClick = () => {
    // Si el usuario no está autenticado, redirige a /login
    if (!user) {
      navigate("/login");
      return;
    }
    // Caso contrario, ejecuta la función onSave pasada por props
    if (onSave) {
      onSave();
    }
  };

  return (
    <motion.div
      className="bg-white bg-opacity-70 backdrop-blur-sm border border-green-200 p-6 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Botón para generar reporte en PDF y guardar estimado */}
      <div className="flex gap-3 justify-end mb-4">
        <PDFReportButton
          results={results}
          productName={productName}
          currency={currency}
          gastosPlanta={gastosPlanta}
          insumos={insumos}
        />

        <button
          type="button"
          onClick={handleSaveClick}
          data-html2canvas-ignore="true"
          className="text-green-700 font-bold underline bg-transparent border-0 cursor-pointer focus:outline-none no-print"
        >
          {messages.opencalc.saveButton}
        </button>
      </div>

      {/* Encabezado de la sección */}
      <header className="mb-6">
        <motion.h2
          className="text-2xl font-montserrat font-bold text-green-700 flex items-center gap-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <FileText size={24} className="text-green-500" />
          {productName ? `${header.product}: ${productName}` : header.product}
          <HelpTooltip text={header.help.product} />
        </motion.h2>
        <motion.h3
          className="text-xl font-montserrat font-bold text-green-700 flex items-center gap-2"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {header.resultsSummary}
          <HelpTooltip text={header.help.resultsSummary} />
        </motion.h3>
      </header>

      {/* Tarjetas de resultados */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {resultCards.map((item, index) => (
          <motion.div
            key={index}
            className="p-4 border rounded-xl shadow-md bg-white hover:bg-green-50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <label className="font-ubuntu text-sm text-gray-600 flex items-center gap-1">
              {item.label}
              {item.help && <HelpTooltip text={item.help} />}
            </label>
            <div className="text-lg text-green-700 font-bold">
              {item.showCurrency ? `${currency} ${item.value}` : item.value}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Detalles de Gastos de Planta */}
      <section className="mb-8">
        <motion.h4
          className="text-lg font-montserrat font-bold text-green-700 flex items-center gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <DollarSign size={20} className="text-green-500" />
          {plantCostDetails.title}
          <HelpTooltip text={plantCostDetails.help.title} />
        </motion.h4>
        {/* Vista para pantallas grandes: Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm font-raleway border border-green-200 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2 items-center gap-1">
                  <div className="inline-flex">
                    {plantCostDetails.description}
                    <HelpTooltip text={plantCostDetails.help.description} />
                  </div>
                </th>
                <th className="p-2 items-center gap-1">
                  <div className='flex'>
                    {plantCostDetails.monthlyCost}
                    <HelpTooltip text={plantCostDetails.help.monthlyCost} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {gastosPlanta.map((gasto, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="p-2">{gasto.name || '-'}</td>
                  <td className="p-2">
                    {currency} {parseFloat(gasto.monthlyCost || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Vista para móviles: Acordeón */}
        <div className="block md:hidden">
          <motion.div
            onClick={() => setIsPlantCostOpen(!isPlantCostOpen)}
            className="bg-green-100 p-3 flex justify-between items-center cursor-pointer rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-bold">{plantCostDetails.title}</span>
            <span className="font-bold">{isPlantCostOpen ? '-' : '+'}</span>
          </motion.div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isPlantCostOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-raleway border border-green-200 rounded-lg">
                <thead className="bg-green-100">
                  <tr>
                    <th className="p-2 items-center gap-1">
                      <div className="flex">
                        {plantCostDetails.description}
                        <HelpTooltip text={plantCostDetails.help.description} />
                      </div>
                    </th>
                    <th className="p-2 items-center gap-1">
                      <div className='flex'>
                        {plantCostDetails.monthlyCost}
                        <HelpTooltip text={plantCostDetails.help.monthlyCost} />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gastosPlanta.map((gasto, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-2">{gasto.name || '-'}</td>
                      <td className="p-2">
                        {currency} {parseFloat(gasto.monthlyCost || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detalles de Insumos */}
      <section>
        <motion.h4
          className="text-lg font-montserrat font-bold text-green-700 flex items-center gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Layers size={20} className="text-green-500" />
          {suppliesDetails.title}
          <HelpTooltip text={suppliesDetails.help.title} />
        </motion.h4>
        {/* Vista para pantallas grandes: Tabla */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left text-sm font-raleway border border-green-200 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2 items-center gap-1">
                  <div className='flex'>
                    {suppliesDetails.headers.material}
                    <HelpTooltip text={suppliesDetails.help.material} />
                  </div>
                </th>
                <th className="p-2 items-center gap-1">
                  <div className="inline-flex">
                    {suppliesDetails.headers.price}
                    <HelpTooltip text={suppliesDetails.help.price} />
                  </div>
                </th>
                <th className="p-2 items-center gap-1">
                  <div className="inline-flex">
                    {suppliesDetails.headers.netContent}
                    <HelpTooltip text={suppliesDetails.help.netContent} />
                  </div>
                </th>
                <th className="p-2 items-center gap-1">
                  <div className="inline-flex">
                    {suppliesDetails.headers.unit}
                    <HelpTooltip text={suppliesDetails.help.unit} />
                  </div>
                </th>
                <th className="p-2 items-center gap-1">
                  <div className="inline-flex">
                    {suppliesDetails.headers.usedQuantity}
                    <HelpTooltip text={suppliesDetails.help.usedQuantity} />
                  </div>
                </th>
                <th className="p-2 items-center gap-1">
                  <div className="inline-flex">
                    {suppliesDetails.headers.costPerLot}
                    <HelpTooltip text={suppliesDetails.help.costPerLot} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {insumos.map((insumo, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 block md:table-row bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none shadow-md md:shadow-none mb-3 md:mb-0"
                >
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">{suppliesDetails.headers.material}:</span> {insumo.material || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">{suppliesDetails.headers.price}:</span> {currency} {parseFloat(insumo.price || 0).toFixed(2)}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">{suppliesDetails.headers.netContent}:</span> {insumo.netContent || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">{suppliesDetails.headers.unit}:</span> {insumo.netContentUnit || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">{suppliesDetails.headers.usedQuantity}:</span> {insumo.usedQuantity || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">{suppliesDetails.headers.costPerPice}:</span> {currency} {parseFloat(insumo.costPerPiece || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Vista para móviles: Tarjetas en scroll horizontal */}
        <div className="md:hidden overflow-x-auto flex gap-4 py-2">
          {insumos.map((insumo, index) => (
            <motion.div
              key={index}
              className="min-w-[250px] bg-white border shadow-md rounded-xl p-3 hover:shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <p><strong>{suppliesDetails.headers.material}:</strong> {insumo.material || '-'}</p>
              <p><strong>{suppliesDetails.headers.price}:</strong> {currency} {parseFloat(insumo.price || 0).toFixed(2)}</p>
              <p><strong>{suppliesDetails.headers.netContent}:</strong> {insumo.netContent || '-'}</p>
              <p><strong>{suppliesDetails.headers.unit}:</strong> {insumo.netContentUnit || '-'}</p>
              <p><strong>{suppliesDetails.headers.usedQuantity}:</strong> {insumo.usedQuantity || '-'}</p>
              <p><strong>{suppliesDetails.headers.costPerPice}:</strong> {currency} {parseFloat(insumo.costPerPiece || 0).toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default ResultsSection;
