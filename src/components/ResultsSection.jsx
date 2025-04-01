// Import React library to build UI components
import React from 'react';
// Import motion for animations from the framer-motion library
import { motion } from 'framer-motion';
// Import icons used in this component from the lucide-react library
import { FileText, DollarSign, Layers } from 'lucide-react';
// Import the PDFReportButton component to allow users to download a PDF report
import PDFReportButton from './PDFReportButton';
// Import custom hook for handling translations
import useTranslations from '../hooks/useTranslations';

// Define the ResultsSection component which receives several props related to results and costs
const ResultsSection = ({ results, gastosPlanta, insumos, productName, currency }) => {
  // Retrieve translation messages using a custom hook
  const messages = useTranslations();
  // If translations are not loaded yet, show a loading indicator
  if (!messages) return <div className="text-green-700 font-bold">Loading...</div>;

  // Destructure necessary translation messages for this section
  const { header, cards, plantCostDetails, suppliesDetails } = messages.resultsSection;
  // Destructure various result values from the results prop
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

  // Prepare data for the result cards using an array of objects
  const resultCards = [
    { label: cards.costElaboration, value: costElaboration, showCurrency: true },
    { label: cards.fixedCostTotal, value: monthlyPlantCost, showCurrency: true },
    { label: cards.dailyUnitCost, value: dailyUnitCost, showCurrency: true },
    { label: cards.performance, value: performance, showCurrency: false },
    { label: cards.saleUnitCost, value: saleUnitCost, showCurrency: true },
    { label: cards.gainPercentage, value: `${gainPercentage}%`, showCurrency: false },
    { label: cards.salePrice, value: salePrice, showCurrency: true },
    { label: cards.gain, value: gain, showCurrency: true },
  ];

  return (
    // Main container for the results section with motion animation
    <motion.div
      className="bg-white bg-opacity-70 backdrop-blur-sm border border-green-200 p-6 rounded-2xl shadow-lg"
      // Initial state for the animation (slightly transparent and shifted down)
      initial={{ opacity: 0, y: 10 }}
      // Animate to a fully visible state and original position
      animate={{ opacity: 1, y: 0 }}
      // Set the duration for the transition animation
      transition={{ duration: 0.5 }}
    >
      {/* PDF Report Button Section */}
      <div className="flex justify-end mb-4">
        <PDFReportButton
          results={results}
          productName={productName}
          currency={currency}
          gastosPlanta={gastosPlanta}
          insumos={insumos}
        />
      </div>

      {/* Header Section for the results */}
      <header className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-green-700 flex items-center gap-2">
          {/* Icon for the header */}
          <FileText size={24} className="text-green-500" />
          {/* Display product name if provided; otherwise, only display the header text */}
          {productName ? `${header.product}: ${productName}` : header.product}
        </h2>
        <h3 className="text-xl font-montserrat font-bold text-green-700">
          {header.resultsSummary}
        </h3>
      </header>

      {/* Grid Layout for Result Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {resultCards.map((item, index) => (
          // Each card is wrapped in a motion.div for a hover scale effect
          <motion.div
            key={index}
            className="p-4 border rounded-xl shadow-md bg-white"
            whileHover={{ scale: 1.05 }}
          >
            {/* Label for the card */}
            <label className="block font-ubuntu text-sm text-gray-600">{item.label}</label>
            {/* Display the value with or without the currency symbol depending on the card's settings */}
            <div className="text-lg text-green-700 font-bold">
              {item.showCurrency ? `${currency} ${item.value}` : item.value}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Section for Plant Cost Details */}
      <section className="mb-8">
        <h4 className="text-lg font-montserrat font-bold text-green-700 flex items-center gap-2 mb-3">
          {/* Icon for plant cost details */}
          <DollarSign size={20} className="text-green-500" />
          {plantCostDetails.title}
        </h4>
        <div className="overflow-x-auto">
          {/* Table for displaying plant costs */}
          <table className="w-full text-left text-sm font-raleway border border-green-200 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2">{plantCostDetails.description}</th>
                <th className="p-2">{plantCostDetails.monthlyCost}</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through gastosPlanta array to generate table rows */}
              {gastosPlanta.map((gasto, index) => (
                <tr key={index} className="border-b last:border-0">
                  {/* Display description of the cost or '-' if not available */}
                  <td className="p-2">{gasto.name || '-'}</td>
                  <td className="p-2">
                    {currency} {parseFloat(gasto.monthlyCost || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section for Supplies Details */}
      <section>
        <h4 className="text-lg font-montserrat font-bold text-green-700 flex items-center gap-2 mb-3">
          {/* Icon for supplies details */}
          <Layers size={20} className="text-green-500" />
          {suppliesDetails.title}
        </h4>
        <div className="overflow-x-auto">
          {/* Table for displaying supplies details */}
          <table className="w-full text-left text-sm font-raleway border border-green-200 rounded-lg">
            {/* Table header hidden on small screens, visible on medium and larger screens */}
            <thead className="bg-green-100 hidden md:table-header-group">
              <tr>
                <th className="p-2">{suppliesDetails.headers.material}</th>
                <th className="p-2">{suppliesDetails.headers.price}</th>
                <th className="p-2">{suppliesDetails.headers.netContent}</th>
                <th className="p-2">{suppliesDetails.headers.unit}</th>
                <th className="p-2">{suppliesDetails.headers.usedQuantity}</th>
                <th className="p-2">{suppliesDetails.headers.costPerLot}</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through insumos array to generate table rows for supplies */}
              {insumos.map((insumo, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 block md:table-row bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none shadow-md md:shadow-none mb-3 md:mb-0"
                >
                  {/* Each cell includes a label on small screens for clarity */}
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

// Export the ResultsSection component so it can be imported and used in other parts of the application
export default ResultsSection;
