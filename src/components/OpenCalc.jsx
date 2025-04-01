import React, { useState, useMemo } from 'react';
import ProductInfoForm from './ProductInfoForm';
import GraphSection from './GraphSection';
import ResultsSection from './ResultsSection';
import SupplyTable from './SupplyTable';
import ExpenseTable from './ExpenseTable';
import DailyExpenses from './DailyExpenses';
import useTranslations from '../hooks/useTranslations';

// Helper function to convert values to numbers, returning a default value if conversion fails
const toNumber = (value, defaultValue = 0) => parseFloat(value) || defaultValue;

// Main component for the OpenCalc application
const OpenCalc = () => {
  const translations = useTranslations(); // Custom hook to fetch translations for internationalization

  // State for currency selection, initialized to 'MXN' (Mexican Peso)
  const [currency, setCurrency] = useState('MXN');

  // State for product information, including name, units produced, time frame, and desired gain percentage
  const [productInfo, setProductInfo] = useState({
    productName: '', // Name of the product
    producedUnits: '', // Number of units produced
    timeFrame: 'week', // Production time frame (week, twoWeeks, month)
    gainPercentage: 15, // Desired profit margin percentage
  });

  // State for input materials (insumos), each with properties like material name, price, and cost per piece
  const [insumos, setInsumos] = useState([
    { material: '', price: '', netContent: '', netContentUnit: 'pieza', usedQuantity: '', costPerPiece: '' },
  ]);

  // State for plant expenses (gastosPlanta), each with a name and monthly cost
  const [gastosPlanta, setGastosPlanta] = useState([{ name: '', monthlyCost: '' }]);

  // States for daily operational inputs
  const [workDays, setWorkDays] = useState(''); // Number of working days
  const [dailyAvg, setDailyAvg] = useState(''); // Average daily production
  const [localCost, setLocalCost] = useState(''); // Additional local cost

  // Handler to update product information fields dynamically
  const handleProductInfoChange = (field, value) => {
    setProductInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handler to update a specific field in an insumo and recalculate cost per piece
  const handleChangeInsumo = (index, field, value) => {
    setInsumos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      // Recalculate costPerPiece when price, netContent, or usedQuantity changes
      if (['price', 'netContent', 'usedQuantity'].includes(field)) {
        const price = toNumber(updated[index].price);
        const netContent = toNumber(updated[index].netContent, 1); // Default to 1 to avoid division by zero
        const usedQuantity = toNumber(updated[index].usedQuantity);
        const costPerPiece = netContent !== 0 ? (price / netContent) * usedQuantity : 0;
        updated[index].costPerPiece = costPerPiece.toFixed(2); // Round to 2 decimal places
      }
      return updated;
    });
  };

  // Handler to add a new empty insumo entry
  const handleAddInsumo = () => {
    setInsumos((prev) => [
      ...prev,
      { material: '', price: '', netContent: '', netContentUnit: '', usedQuantity: '', costPerPiece: '' },
    ]);
  };

  // Handler to delete an insumo by its index
  const handleDeleteInsumo = (index) => {
    setInsumos((prev) => prev.filter((_, i) => i !== index));
  };

  // Handler to update a specific field in a plant expense
  const handleChangeGastoPlanta = (index, field, value) => {
    setGastosPlanta((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Handler to add a new empty plant expense entry
  const handleAddGastoPlanta = () => {
    setGastosPlanta((prev) => [...prev, { name: '', monthlyCost: '' }]);
  };

  // Handler to delete a plant expense by its index
  const handleDeleteGastoPlanta = (index) => {
    setGastosPlanta((prev) => prev.filter((_, i) => i !== index));
  };

  // Memoized calculation for the total cost of all insumos
  const totalInsumos = useMemo(() => 
    insumos.reduce((acc, item) => acc + toNumber(item.costPerPiece), 0),
    [insumos] // Recalculates only when insumos change
  );

  // Memoized calculation for the total plant cost
  const plantCost = useMemo(() =>
    gastosPlanta.reduce((acc, gasto) => acc + toNumber(gasto.monthlyCost), 0),
    [gastosPlanta] // Recalculates only when gastosPlanta change
  );

  // Production cost is directly tied to the total cost of insumos
  const productionCost = totalInsumos;

  // Memoized calculation for cost per day based on plant cost and work days
  const costPerDay = useMemo(() => {
    if (workDays && plantCost) {
      return (plantCost / toNumber(workDays)).toFixed(2);
    }
    return ''; // Return empty string if inputs are invalid
  }, [workDays, plantCost]);

  // Memoized calculation for total cost (plant cost + production cost)
  const totalCost = useMemo(() => {
    const total = plantCost + productionCost;
    return total.toFixed(2); // Round to 2 decimal places
  }, [plantCost, productionCost]);

  // Memoized calculation for financial results based on all inputs
  const results = useMemo(() => {
    const fixedCostPerDay = workDays ? plantCost / toNumber(workDays) : plantCost;
    let daysMultiplier = 1; // Multiplier to adjust costs based on time frame
    switch (productInfo.timeFrame) {
      case 'week':
        daysMultiplier = 7;
        break;
      case 'twoWeeks':
        daysMultiplier = 14;
        break;
      case 'month':
        daysMultiplier = 30;
        break;
      default:
        break;
    }
    const fixedCostTotal = fixedCostPerDay * daysMultiplier; // Total fixed cost over the time frame
    const baseCost = totalInsumos + fixedCostTotal + toNumber(localCost); // Total base cost
    const performance = toNumber(productInfo.producedUnits, 1); // Units produced, default to 1
    const saleUnitCost = baseCost / performance; // Cost per unit sold
    const gainPct = toNumber(productInfo.gainPercentage); // Gain percentage as a number
    const salePriceCalc = saleUnitCost * (1 + gainPct / 100); // Sale price including gain
    const gainCalc = salePriceCalc - saleUnitCost; // Profit per unit

    // Return an object with formatted financial results
    return {
      costElaboration: totalInsumos.toFixed(2), // Cost of materials
      monthlyPlantCost: plantCost.toFixed(2), // Total plant expenses
      fixedCostTotal: fixedCostTotal.toFixed(2), // Fixed cost over time frame
      dailyUnitCost: (workDays && dailyAvg
        ? (fixedCostPerDay / toNumber(dailyAvg)).toFixed(2) // Cost per unit per day
        : fixedCostPerDay.toFixed(2)),
      performance, // Units produced
      saleUnitCost: saleUnitCost.toFixed(2), // Base cost per unit
      gainPercentage: gainPct, // Desired gain percentage
      salePrice: salePriceCalc.toFixed(2), // Final sale price per unit
      gain: gainCalc.toFixed(2), // Profit per unit
    };
  }, [totalInsumos, plantCost, workDays, localCost, productInfo, dailyAvg]);

  // Render the UI with sections for product info, graphs, results, and tables
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md space-y-8">
      {!translations ? (
        <div>Loading...</div> // Display loading message if translations are not yet available
      ) : (
        <>
          {/* Product Information Section */}
          <section className="bg-white p-4 rounded-md shadow-sm">
            <ProductInfoForm
              currency={currency}
              onCurrencyChange={setCurrency}
              productName={productInfo.productName}
              producedUnits={productInfo.producedUnits}
              timeFrame={productInfo.timeFrame}
              gainPercentage={productInfo.gainPercentage}
              onProductChange={(e) => handleProductInfoChange('productName', e.target.value)}
              onUnitsChange={(e) => handleProductInfoChange('producedUnits', e.target.value)}
              onTimeFrameChange={(e) => handleProductInfoChange('timeFrame', e.target.value)}
              onGainChange={(e) => handleProductInfoChange('gainPercentage', e.target.value)}
            />
          </section>

          {/* Graphs and Results Section */}
          <section id="pdf-container" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 bg-white p-4 rounded-md shadow-sm">
              <GraphSection insumos={insumos} gastosPlanta={gastosPlanta} />
            </div>
            <div className="md:col-span-2 bg-white p-4 rounded-md shadow-sm">
              <ResultsSection
                results={results}
                gastosPlanta={gastosPlanta}
                insumos={insumos}
                productName={productInfo.productName}
                currency={currency}
              />
            </div>
          </section>

          {/* Tables Section */}
          <section className="space-y-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <SupplyTable
                insumos={insumos}
                onChange={handleChangeInsumo}
                onAdd={handleAddInsumo}
                onDelete={handleDeleteInsumo}
                totalInsumos={totalInsumos}
                timeFrame={productInfo.timeFrame}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <ExpenseTable
                  gastos={gastosPlanta}
                  onChange={handleChangeGastoPlanta}
                  onAdd={handleAddGastoPlanta}
                  onDelete={handleDeleteGastoPlanta}
                  totalPlantCost={plantCost}
                />
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <DailyExpenses
                  workDays={workDays}
                  setWorkDays={setWorkDays}
                  costPerDay={costPerDay}
                  dailyAvg={dailyAvg}
                  setDailyAvg={setDailyAvg}
                  localCost={localCost}
                  setLocalCost={setLocalCost}
                  productionCost={productionCost}
                  totalCost={totalCost}
                  plantCost={plantCost}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default OpenCalc;