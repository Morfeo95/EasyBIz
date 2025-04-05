import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartPie, Factory } from "lucide-react";
import { motion } from "framer-motion";
import useTranslations from "../../hooks/useTranslations";

Chart.register(ArcElement, Tooltip, Legend);

const GraficaPastel = ({ insumos, gastosPlanta }) => {
  const messages = useTranslations();
  if (!messages)
    return <div className="text-green-700 font-bold">Cargando...</div>;

  // Desestructuración de títulos traducidos
  const { insumosTitle, plantExpensesTitle } = messages.graficaPastel;

  // Datos para el gráfico de insumos
  const insumosLabels = insumos.map((item) => item.material || "Sin nombre");
  const insumosData = insumos.map((item) => parseFloat(item.costPerPiece) || 0);

  // Datos para el gráfico de gastos de planta
  const gastosLabels = gastosPlanta.map((item) => item.name || "Sin nombre");
  const gastosData = gastosPlanta.map((item) => parseFloat(item.monthlyCost) || 0);

  // Función para generar colores dinámicos
  const generateColors = (count) =>
    Array.from({ length: count }, (_, idx) => `hsl(${(idx * 50) % 360}, 70%, 50%)`);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { family: "Montserrat, sans-serif", size: 14 },
          color: "#065f46",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-8 p-4 max-w-full overflow-hidden">
      {/* Gráfico de insumos */}
      <motion.div
        className="w-full h-64 p-4 bg-white bg-opacity-90 backdrop-blur-md border border-green-200 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-green-700 font-ubuntu mb-2 flex items-center gap-2">
          <ChartPie size={22} className="text-green-500" />
          {insumosTitle}
        </h3>
        <div className="w-full h-full">
          <Pie
            data={{
              labels: insumosLabels,
              datasets: [
                {
                  data: insumosData,
                  backgroundColor: generateColors(insumosLabels.length),
                  hoverOffset: 6,
                },
              ],
            }}
            options={options}
          />
        </div>
      </motion.div>

      {/* Gráfico de gastos de planta */}
      <motion.div
        className="w-full h-64 p-4 bg-white bg-opacity-90 backdrop-blur-md border border-green-200 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-green-700 font-ubuntu mb-2 flex items-center gap-2">
          <Factory size={22} className="text-green-500" />
          {plantExpensesTitle}
        </h3>
        <div className="w-full h-full">
          <Pie
            data={{
              labels: gastosLabels,
              datasets: [
                {
                  data: gastosData,
                  backgroundColor: generateColors(gastosLabels.length),
                  hoverOffset: 6,
                },
              ],
            }}
            options={options}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default GraficaPastel;
