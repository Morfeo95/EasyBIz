import React, { useState, useMemo } from 'react';
import ProductInfoForm from './ProductInfoForm';
import GraphSection from './GraphSection';
import ResultsSection from './ResultsSection';
import SupplyTable from './SupplyTable';
import ExpenseTable from './ExpenseTable';
import DailyExpenses from './DailyExpenses';
import useTranslations from '../hooks/useTranslations';
import DonationModal from './DonationModal';

// Helper function to convert values to numbers, returning a default value if conversion fails
const toNumber = (value, defaultValue = 0) => parseFloat(value) || defaultValue;

const OpenCalc = () => {
  const translations = useTranslations(); // Hook de traducciones

  // Estados generales
  const [currency, setCurrency] = useState('MXN');
  const [productInfo, setProductInfo] = useState({
    productName: '',
    producedUnits: '',
    timeFrame: 'week',
    gainPercentage: 15,
  });
  const [insumos, setInsumos] = useState([
    { material: '', price: '', netContent: '', netContentUnit: 'pieza', usedQuantity: '', costPerPiece: '' },
  ]);
  const [gastosPlanta, setGastosPlanta] = useState([{ name: '', monthlyCost: '' }]);
  const [workDays, setWorkDays] = useState('');
  const [dailyAvg, setDailyAvg] = useState('');
  const [localCost, setLocalCost] = useState('');

  // Handlers para ProductInfoForm
  const handleProductInfoChange = (field, value) => {
    setProductInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handlers para Insumos
  const handleChangeInsumo = (index, field, value) => {
    setInsumos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // Recalcular costPerPiece cuando cambian price, netContent o usedQuantity
      if (['price', 'netContent', 'usedQuantity'].includes(field)) {
        const price = toNumber(updated[index].price);
        const netContent = toNumber(updated[index].netContent, 1);
        const usedQuantity = toNumber(updated[index].usedQuantity);
        const costPerPiece = netContent !== 0 ? (price / netContent) * usedQuantity : 0;
        updated[index].costPerPiece = costPerPiece.toFixed(2);
      }
      return updated;
    });
  };

  const handleAddInsumo = () => {
    setInsumos((prev) => [
      ...prev,
      { material: '', price: '', netContent: '', netContentUnit: 'pieza', usedQuantity: '', costPerPiece: '' },
    ]);
  };

  const handleDeleteInsumo = (index) => {
    setInsumos((prev) => prev.filter((_, i) => i !== index));
  };

  // Handlers para Gastos de Planta
  const handleChangeGastoPlanta = (index, field, value) => {
    setGastosPlanta((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddGastoPlanta = () => {
    setGastosPlanta((prev) => [...prev, { name: '', monthlyCost: '' }]);
  };

  const handleDeleteGastoPlanta = (index) => {
    setGastosPlanta((prev) => prev.filter((_, i) => i !== index));
  };

  // Cálculos memorizados
  const totalInsumos = useMemo(() => 
    insumos.reduce((acc, item) => acc + toNumber(item.costPerPiece), 0),
    [insumos]
  );

  const plantCost = useMemo(() =>
    gastosPlanta.reduce((acc, gasto) => acc + toNumber(gasto.monthlyCost), 0),
    [gastosPlanta]
  );

  const productionCost = totalInsumos;

  const costPerDay = useMemo(() => {
    if (workDays && plantCost) {
      return (plantCost / toNumber(workDays)).toFixed(2);
    }
    return '';
  }, [workDays, plantCost]);

  const totalCost = useMemo(() => {
    const total = plantCost + productionCost;
    return total.toFixed(2);
  }, [plantCost, productionCost]);

  const results = useMemo(() => {
    const fixedCostPerDay = workDays ? plantCost / toNumber(workDays) : plantCost;
    let daysMultiplier = 1;
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
    const fixedCostTotal = fixedCostPerDay * daysMultiplier;
    const baseCost = totalInsumos + fixedCostTotal;
    const performance = toNumber(productInfo.producedUnits, 1);
    const saleUnitCost = (baseCost / performance) + toNumber(localCost);
    const gainPct = toNumber(productInfo.gainPercentage);
    const salePriceCalc = saleUnitCost * (1 + gainPct / 100);
    const gainCalc = salePriceCalc - saleUnitCost;
    const dailyUnitCost = (workDays && dailyAvg
      ? (fixedCostPerDay / toNumber(dailyAvg)).toFixed(2)
      : fixedCostPerDay.toFixed(2));

    return {
      costElaboration: totalInsumos.toFixed(2),
      monthlyPlantCost: plantCost.toFixed(2),
      fixedCostTotal: fixedCostTotal.toFixed(2),
      dailyUnitCost: dailyUnitCost,
      performance,
      saleUnitCost: saleUnitCost.toFixed(2),
      gainPercentage: gainPct,
      salePrice: salePriceCalc.toFixed(2),
      gain: gainCalc.toFixed(2),
    };
  }, [totalInsumos, plantCost, workDays, localCost, productInfo, dailyAvg]);

  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg space-y-8">
      {!translations ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Sección 1: Información del Producto */}
          <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <DonationModal message="¡Ayúdanos a seguir mejorando donando para nuestro proyecto!" />
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-700 text-center">
              {translations.productInfoSection.title}
            </h2>
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

          {/* Sección 2: Entrada de Datos Operativos */}
          <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-700 text-center">
              {translations.operationalData.title}
            </h2>
            <div className="space-y-4">
              {/* Insumos */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-green-700 text-center">
                  {translations.supplyTable.title}
                </h3>
                <SupplyTable
                  insumos={insumos}
                  onChange={handleChangeInsumo}
                  onAdd={handleAddInsumo}
                  onDelete={handleDeleteInsumo}
                  totalInsumos={totalInsumos}
                  timeFrame={productInfo.timeFrame}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Gastos de Planta */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-green-700 text-center">
                    {translations.expenseTable.title}
                  </h3>
                  <ExpenseTable
                    gastos={gastosPlanta}
                    onChange={handleChangeGastoPlanta}
                    onAdd={handleAddGastoPlanta}
                    onDelete={handleDeleteGastoPlanta}
                    totalPlantCost={plantCost}
                  />
                </div>
                {/* Gastos Diarios y Operación */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-green-700 text-center">
                    {translations.dailyExpenses.title}
                  </h3>
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
            </div>
          </section>

          {/* Sección 3: Resultados y Visualización */}
          <section id="pdf-container" className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-700 text-center">
              {translations.resultsAndGraphs.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GraphSection insumos={insumos} gastosPlanta={gastosPlanta} />
              <ResultsSection
                results={results}
                gastosPlanta={gastosPlanta}
                insumos={insumos}
                productName={productInfo.productName}
                currency={currency}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default OpenCalc;
