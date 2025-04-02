import React from 'react';
import { motion } from 'framer-motion';
import { FileText, DollarSign, Layers } from 'lucide-react';
import PDFReportButton from './PDFReportButton';
import useTranslations from '../hooks/useTranslations';
import HelpTooltip from './HelpTooltip';

const ResultsSection = ({ results, gastosPlanta, insumos, productName, currency }) => {
  const messages = useTranslations();
  if (!messages) return <div className="text-green-700 font-bold">Cargando...</div>;

  // Desestructuración de textos y valores de resultados
  const { header, cards, plantCostDetails, suppliesDetails } = messages.resultsSection;
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

  // Preparación de las tarjetas de resultados
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

  return (
    <motion.div
      className="bg-white bg-opacity-70 backdrop-blur-sm border border-green-200 p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Botón para generar reporte en PDF */}
      <div className="flex justify-end mb-4">
        <PDFReportButton
          results={results}
          productName={productName}
          currency={currency}
          gastosPlanta={gastosPlanta}
          insumos={insumos}
        />
      </div>

      {/* Encabezado de la sección */}
      <header className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-green-700 flex items-center gap-2">
          <FileText size={24} className="text-green-500" />
          {productName ? `${header.product}: ${productName}` : header.product}
          <HelpTooltip text={header.help.product} />
        </h2>
        <h3 className="text-xl font-montserrat font-bold text-green-700 flex items-center gap-2">
          {header.resultsSummary}
          <HelpTooltip text={header.help.resultsSummary} />
        </h3>
      </header>

      {/* Tarjetas de resultados */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {resultCards.map((item, index) => (
          <motion.div
            key={index}
            className="p-4 border rounded-xl shadow-md bg-white"
            whileHover={{ scale: 1.05 }}
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
        <h4 className="text-lg font-montserrat font-bold text-green-700 flex items-center gap-2 mb-3">
          <DollarSign size={20} className="text-green-500" />
          {plantCostDetails.title}
          <HelpTooltip text={plantCostDetails.help.title} />
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-raleway border border-green-200 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2  items-center gap-1">
                  <div className='flex'>
                    {plantCostDetails.description}
                    <HelpTooltip text={plantCostDetails.help.description} />
                  </div>
                  
                </th>
                <th className="p-2 flex items-center gap-1">
                  {plantCostDetails.monthlyCost}
                  <HelpTooltip text={plantCostDetails.help.monthlyCost} />
                </th>
              </tr>
            </thead>
            <tbody>
              {gastosPlanta.map((gasto, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="p-2">{gasto.name || '-'}</td>
                  <td className="p-2">{currency} {parseFloat(gasto.monthlyCost || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detalles de Insumos */}
      <section>
        <h4 className="text-lg font-montserrat font-bold text-green-700 flex items-center gap-2 mb-3">
          <Layers size={20} className="text-green-500" />
          {suppliesDetails.title}
          <HelpTooltip text={suppliesDetails.help.title} />
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-raleway border border-green-200 rounded-lg">
            <thead className="bg-green-100 hidden md:table-header-group">
              <tr>
                <th className="p-2 flex items-center gap-1">
                  {suppliesDetails.headers.material}
                  <HelpTooltip text={suppliesDetails.help.material} />
                </th>
                <th className="p-2  items-center gap-1">
                  <div className='flex'>
                  {suppliesDetails.headers.price}
                  <HelpTooltip text={suppliesDetails.help.price} />
                  </div>
                  
                </th>
                <th className="p-2  items-center gap-1">
                  <div className='flex'>
                    {suppliesDetails.headers.netContent}
                  <HelpTooltip text={suppliesDetails.help.netContent} />
                  </div>
                  
                </th>
                <th className="p-2  items-center gap-1">
                <div className='flex'>
                  {suppliesDetails.headers.unit}
                  <HelpTooltip text={suppliesDetails.help.unit} />
                </div>

                </th>
                <th className="p-2  items-center gap-1">
                <div className='flex'>
                  {suppliesDetails.headers.usedQuantity}
                  <HelpTooltip text={suppliesDetails.help.usedQuantity} />
                </div>

                  
                </th>
                <th className="p-2  items-center gap-1">
                <div className='flex'>
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
                    <span className="md:hidden font-semibold text-gray-600">Material:</span> {insumo.material || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">Price:</span> {currency} {parseFloat(insumo.price || 0).toFixed(2)}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">Net Content:</span> {insumo.netContent || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">Unit:</span> {insumo.netContentUnit || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">Used Quantity:</span> {insumo.usedQuantity || '-'}
                  </td>
                  <td className="p-2 block md:table-cell">
                    <span className="md:hidden font-semibold text-gray-600">Cost per Piece:</span> {currency} {parseFloat(insumo.costPerPiece || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
};

export default ResultsSection;
