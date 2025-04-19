// src/pages/OpenCalc.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductInfoForm from '../components/opencalc/ProductInfoForm';
import GraphSection from '../components/opencalc/GraphSection';
import ResultsSection from '../components/opencalc/ResultsSection';
import SupplyTable from '../components/opencalc/SupplyTable';
import ExpenseTable from '../components/opencalc/ExpenseTable';
import DailyExpenses from '../components/opencalc/DailyExpenses';
import useTranslations from '../hooks/useTranslations';
import DonationModal from '../components/opencalc/DonationModal';
import { createEstimado, fetchEstimadoById, updateEstimado } from '../services/estimadoService';

const toNumber = (v, def = 0) => parseFloat(v) || def;

const OpenCalc = () => {
  const messages = useTranslations();
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);

  // Parámetros recibidos vía query string
  const returnUrl = params.get('returnUrl');
  const initialProductName = params.get('productName') || '';
  const estId = params.get('estimadoId');
  const prodId = params.get('productId'); // Se lee si viene productId

  // Estados
  const [currency, setCurrency] = useState('MXN');
  const [productInfo, setProductInfo] = useState({
    productName: initialProductName,
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

  // Si se recibe un estimado existente (modo PUT), se carga su información
  useEffect(() => {
    if (!estId) return;
    (async () => {
      try {
        const est = await fetchEstimadoById(estId);
        setCurrency(est.moneda);
        setProductInfo({
          productName: est.nombre,
          producedUnits: est.unidadesProducidas.toString(),
          timeFrame: 'week',
          gainPercentage: est.ganancia,
        });
        setInsumos(est.insumos.map(i => ({
          material: i.material,
          price: i.precio.toString(),
          netContent: i.contenido.toString(),
          netContentUnit: i.unidad,
          usedQuantity: i.cantidadUsada.toString(),
          costPerPiece: i.total.toString(),
        })));
        setGastosPlanta(est.gastosPlanta.map(g => ({
          name: g.nombre,
          monthlyCost: g.costoMensual.toString(),
        })));
        if (est.gastosDiarios.length) {
          const gd = est.gastosDiarios[0];
          setWorkDays(gd.diasDeTrabajo.toString());
          setDailyAvg(gd.promedioDiarioDeVentas.toString());
          setLocalCost(gd.costoLocal.toString());
        }
      } catch (e) {
        console.error("Error cargando estimado:", e);
      }
    })();
  }, [estId]);

  // Handlers y actualización de datos
  const handleProductInfoChange = (field, value) =>
    setProductInfo(prev => ({ ...prev, [field]: value }));

  const handleChangeInsumo = (index, field, value) => {
    setInsumos(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (['price', 'netContent', 'usedQuantity'].includes(field)) {
        const price = toNumber(updated[index].price);
        const content = toNumber(updated[index].netContent, 1);
        const used = toNumber(updated[index].usedQuantity);
        updated[index].costPerPiece = content ? ((price / content) * used).toFixed(2) : '0.00';
      }
      return updated;
    });
  };

  const handleAddInsumo = () =>
    setInsumos(prev => [
      ...prev,
      { material: '', price: '', netContent: '', netContentUnit: 'pieza', usedQuantity: '', costPerPiece: '' },
    ]);
  const handleDeleteInsumo = idx =>
    setInsumos(prev => prev.filter((_, i) => i !== idx));

  const handleChangeGastoPlanta = (index, field, value) => {
    setGastosPlanta(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddGastoPlanta = () =>
    setGastosPlanta(prev => [...prev, { name: '', monthlyCost: '' }]);
  const handleDeleteGastoPlanta = idx =>
    setGastosPlanta(prev => prev.filter((_, i) => i !== idx));

  const totalInsumos = useMemo(
    () => insumos.reduce((sum, item) => sum + toNumber(item.costPerPiece), 0),
    [insumos]
  );
  const plantCost = useMemo(
    () => gastosPlanta.reduce((sum, g) => sum + toNumber(g.monthlyCost), 0),
    [gastosPlanta]
  );
  const costPerDay = useMemo(
    () => (workDays && plantCost ? (plantCost / toNumber(workDays)).toFixed(2) : ''),
    [workDays, plantCost]
  );
  const totalCost = useMemo(
    () => (plantCost + totalInsumos).toFixed(2),
    [plantCost, totalInsumos]
  );

  const results = useMemo(() => {
    const fixedPerDay = workDays ? plantCost / toNumber(workDays) : plantCost;
    const multiplier = productInfo.timeFrame === 'week' 
      ? 7 
      : productInfo.timeFrame === 'twoWeeks' 
      ? 14 
      : productInfo.timeFrame === 'month' 
      ? 30 
      : 1;
    const fixedTotal = fixedPerDay * multiplier;
    const baseCost = totalInsumos + fixedTotal;
    const units = toNumber(productInfo.producedUnits, 1);
    const saleUnitCost = baseCost / units + toNumber(localCost);
    const gainPct = toNumber(productInfo.gainPercentage);
    const salePrice = saleUnitCost * (1 + gainPct / 100);
    const gain = salePrice - saleUnitCost;
    const dailyUnitCost = dailyAvg
      ? (fixedPerDay / toNumber(dailyAvg)).toFixed(2)
      : fixedPerDay.toFixed(2);

    return {
      costElaboration: totalInsumos.toFixed(2),
      monthlyPlantCost: plantCost.toFixed(2),
      fixedCostTotal: fixedTotal.toFixed(2),
      dailyUnitCost,
      performance: units,
      saleUnitCost: saleUnitCost.toFixed(2),
      gainPercentage: gainPct,
      salePrice: salePrice.toFixed(2),
      gain: gain.toFixed(2),
    };
  }, [totalInsumos, plantCost, workDays, localCost, dailyAvg, productInfo]);

  // Manejo de guardado/actualización del estimado (POST o PUT)
  const handleSaveEstimado = async () => {
    try {
      const plazo =
        productInfo.timeFrame === 'week'
          ? 7
          : productInfo.timeFrame === 'twoWeeks'
          ? 14
          : productInfo.timeFrame === 'month'
          ? 30
          : 1;

      const payload = {
        usuarioId: Number(localStorage.getItem('id')),
        moneda: currency,
        nombre: productInfo.productName,
        unidadesProducidas: parseInt(productInfo.producedUnits, 10),
        plazo,
        ganancia: parseInt(productInfo.gainPercentage, 10),
        insumos: insumos.map(i => {
          const precio = toNumber(i.price);
          const contenido = toNumber(i.netContent, 1);
          const cantidadUsada = toNumber(i.usedQuantity);
          const costoPorLote = contenido ? precio / contenido : 0;
          return {
            material: i.material,
            precio,
            contenido,
            unidad: i.netContentUnit,
            cantidadUsada,
            plazo,
            costoPorLote,
            total: costoPorLote * cantidadUsada,
          };
        }),
        gastosPlant: gastosPlanta.map(g => ({
          nombre: g.name,
          costoMensual: toNumber(g.monthlyCost),
        })),
        gastosDiarios: [
          {
            diasDeTrabajo: parseInt(workDays, 10),
            promedioDiarioDeVentas: toNumber(dailyAvg),
            costoLocal: toNumber(localCost),
          },
        ],
      };

      const saved = estId
        ? await updateEstimado({ id: parseInt(estId, 10), ...payload })
        : await createEstimado(payload);

      // Luego de guardar, se redirige según los parámetros recibidos.
      // Si se tiene un returnUrl, se arma la URL de redirección pasando los parámetros
      if (returnUrl) {
        const url = new URL(returnUrl, window.location.origin);
        if (prodId) {
          url.searchParams.set('productId', prodId);
        }
        url.searchParams.set('estimadoId', saved.id);
        url.searchParams.set('productName', payload.nombre);
        url.searchParams.set('salePrice', results.salePrice);
        navigate(`${url.pathname}${url.search}`);
      } else {
        // Si no hay productId asociado, redirige directamente a /profile
        if (!prodId) {
          navigate("/profile");
        } else {
          // Opcional: si existe un productId pero no se recibe returnUrl, se puede notificar o realizar otra acción.
          alert(
            estId
              ? `Estimado actualizado (ID: ${saved.id})`
              : `Estimado creado (ID: ${saved.id})`
          );
        }
      }
    } catch (err) {
      console.error("Error al guardar estimado:", err);
      alert(err.message);
    }
  };

  return (
    <div className="bg-gray-100 pb-26 p-4 md:p-6 rounded-lg shadow-lg space-y-8">
      {!messages ? (
        <div>Cargando...</div>
      ) : (
        <>
          {/* Sección 1: Información del producto */}
          <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <DonationModal message="¡Apóyanos con una donación!" />
            <h2 className="text-xl font-bold text-green-700 text-center">
              {messages.opencalc.productInfoSection.title}
            </h2>
            <ProductInfoForm
              currency={currency}
              onCurrencyChange={setCurrency}
              productName={productInfo.productName}
              producedUnits={productInfo.producedUnits}
              timeFrame={productInfo.timeFrame}
              gainPercentage={productInfo.gainPercentage}
              onProductChange={e => handleProductInfoChange('productName', e.target.value)}
              onUnitsChange={e => handleProductInfoChange('producedUnits', e.target.value)}
              onTimeFrameChange={e => handleProductInfoChange('timeFrame', e.target.value)}
              onGainChange={e => handleProductInfoChange('gainPercentage', e.target.value)}
            />
          </section>

          {/* Sección 2: Datos operativos */}
          <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-green-700 text-center">
              {messages.opencalc.operationalData.title}
            </h2>
            <SupplyTable
              insumos={insumos}
              onChange={handleChangeInsumo}
              onAdd={handleAddInsumo}
              onDelete={handleDeleteInsumo}
              totalInsumos={totalInsumos}
              timeFrame={productInfo.timeFrame}
            />
            <div className="flex flex-col md:flex-row gap-6">
              <ExpenseTable
                gastos={gastosPlanta}
                onChange={handleChangeGastoPlanta}
                onAdd={handleAddGastoPlanta}
                onDelete={handleDeleteGastoPlanta}
                totalPlantCost={plantCost}
              />
              <DailyExpenses
                workDays={workDays}
                setWorkDays={setWorkDays}
                costPerDay={costPerDay}
                dailyAvg={dailyAvg}
                setDailyAvg={setDailyAvg}
                localCost={localCost}
                setLocalCost={setLocalCost}
                productionCost={totalInsumos}
                totalCost={totalCost}
                plantCost={plantCost}
              />
            </div>
          </section>

          {/* Sección 3: Resultados y gráficos */}
          <section id="pdf-container" className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-green-700 text-center">
              {messages.opencalc.resultsAndGraphs.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GraphSection insumos={insumos} gastosPlanta={gastosPlanta} />
              <ResultsSection
                results={results}
                gastosPlanta={gastosPlanta}
                insumos={insumos}
                productName={productInfo.productName}
                currency={currency}
                onSave={handleSaveEstimado}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default OpenCalc;
