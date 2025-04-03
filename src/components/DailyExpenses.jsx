import React from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, LineChart, Boxes } from "lucide-react";
import NumberInput from "./NumberInput";
import useTranslations from "../hooks/useTranslations";
import HelpTooltip from "./HelpTooltip";

const DailyExpenses = ({
  workDays,
  setWorkDays,
  costPerDay,
  dailyAvg,
  setDailyAvg,
  localCost,
  setLocalCost,
  productionCost,
  totalCost,
  plantCost,
}) => {
  const messages = useTranslations();
  if (!messages) {
    return (
      <div className="text-center text-green-700 font-bold">Cargando...</div>
    );
  }

  const {
    title,
    workDays: workDaysLabel,
    costPerDay: costPerDayLabel,
    dailyAvg: dailyAvgLabel,
    localCost: localCostLabel,
    productionCost: productionCostLabel,
    totalCost: totalCostLabel,
    workDaysPlaceholder,
    dailyAvgPlaceholder,
    localCostPlaceholder,
    productionCostPlaceholder,
    help,
  } = messages.dailyExpenses;

  return (
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-md border border-green-200 p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Título y ayuda contextual */}
      <motion.h3
        className="text-2xl font-montserrat font-bold text-green-700 mb-5 flex items-center gap-2"
        whileHover={{ scale: 1.03 }}
      >
        <LineChart size={24} className="text-green-500" />
        {title}
        <HelpTooltip text={help.title} />
      </motion.h3>

      {/* Grupo de inputs para días y costo por día */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
          <label className="text-sm font-bold text-green-700 flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-green-500" />
            {workDaysLabel}
            <HelpTooltip text={help.workDays} />
          </label>
          <NumberInput
            placeholder={workDaysPlaceholder}
            value={workDays}
            onChange={(e) => setWorkDays(e.target.value)}
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
          <label className="text-sm font-bold text-green-700 mb-2 flex items-center gap-2">
            <DollarSign size={18} className="text-green-500" />
            {costPerDayLabel}
            <HelpTooltip text={help.costPerDay} />
          </label>
          <input
            type="text"
            value={workDays ? costPerDay : plantCost}
            readOnly
            className="bg-gray-100 text-gray-700 p-3 rounded-lg w-full shadow-sm"
          />
        </motion.div>
      </div>

      {/* Input para promedio diario */}
      <motion.div whileHover={{ scale: 1.02 }} className="mb-6">
        <label className="text-sm font-bold text-green-700 mb-2  flex items-center gap-2">
          <Boxes size={18} className="text-green-500" />
          {dailyAvgLabel}
          <HelpTooltip text={help.dailyAvg} />
        </label>
        <NumberInput
          placeholder={dailyAvgPlaceholder}
          value={dailyAvg}
          onChange={(e) => setDailyAvg(e.target.value)}
        />
      </motion.div>

      {/* Tabla resumen de costos */}
      <motion.div whileHover={{ scale: 1.02 }} className="overflow-x-auto rounded-xl border border-green-200">
        <table className="w-full text-left text-sm font-raleway bg-green-50 min-w-[320px] rounded-lg shadow-sm">
          <thead>
            <tr className="bg-green-200 text-green-900">
              <th className="p-3">{localCostLabel}</th>
              <th className="p-3">{productionCostLabel}</th>
              <th className="p-3">{totalCostLabel}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white hover:bg-gray-50 transition">
              <td className="p-3">
                <NumberInput
                  placeholder={localCostPlaceholder}
                  value={localCost}
                  onChange={(e) => setLocalCost(e.target.value)}
                  Icon={DollarSign}
                />
              </td>
              <td className="p-3">
                <NumberInput
                  placeholder={productionCostPlaceholder}
                  value={productionCost}
                  onChange={() => {}}
                  Icon={DollarSign}
                />
              </td>
              <td className="p-3">
                <input
                  type="text"
                  value={totalCost}
                  readOnly
                  className="bg-gray-100 text-gray-700 p-3 rounded-lg w-full shadow-sm"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default DailyExpenses;
