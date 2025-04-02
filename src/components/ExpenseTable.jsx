import React from "react";
import { motion } from "framer-motion";
import { DollarSign, CirclePlus, Trash2, FileText } from "lucide-react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import Button from "./Button";
import useTranslations from "../hooks/useTranslations";
import HelpTooltip from "./HelpTooltip";

const ExpenseTable = ({ gastos, onChange, onAdd, onDelete, totalPlantCost }) => {
  const translations = useTranslations();
  if (!translations) return null;

  const { expenseTable } = translations;

  return (
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-md border border-green-200 p-5 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Título y ayuda contextual */}
      <h3 className="text-xl font-montserrat font-bold text-green-700 mb-3 flex items-center gap-2">
        <FileText size={22} className="text-green-500" />
        {expenseTable.title}
        <HelpTooltip text={expenseTable.help.title} />
      </h3>
      
      {/* Tabla de gastos */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-raleway border-separate border-spacing-0">
          <thead className="hidden md:table-header-group">
            <motion.tr
              className="flex flex-col md:table-row bg-green-100 text-green-800"
              whileHover={{ scale: 1.01 }}
            >
              <th className="block md:table-cell p-3 w-1/2 font-semibold">
              <div className='flex'>
              {expenseTable.headers.description}
              <HelpTooltip text={expenseTable.help.description} />
              </div>
              </th>
              <th className="block md:table-cell p-3 w-1/2 font-semibold">
              <div className='flex'>
              {expenseTable.headers.monthlyCost}
              <HelpTooltip text={expenseTable.help.monthlyCost} />
              </div>

              </th>
              <th className="block md:table-cell p-3 w-10"></th>
            </motion.tr>
          </thead>
          <tbody>
            {gastos.map((gasto, index) => (
              <motion.tr
                key={index}
                className="flex flex-col md:table-row border-b last:border-0 hover:bg-gray-50 transition duration-200"
                whileHover={{ scale: 1.01 }}
              >
                <td className="block md:table-cell p-3">
                  <label className="mb-1 text-base font-bold font-montserrat text-green-700">
                    {expenseTable.headers.description}
                  </label>
                  <TextInput
                    value={gasto.name}
                    placeholder={expenseTable.placeholders.description}
                    onChange={(e) => onChange(index, "name", e.target.value)}
                    className="w-full"
                  />
                </td>
                <td className="block md:table-cell p-3">
                  <label className="mb-1 text-base font-bold font-montserrat text-green-700">
                    {expenseTable.headers.monthlyCost}
                  </label>
                  <NumberInput
                    value={gasto.monthlyCost}
                    placeholder={expenseTable.placeholders.monthlyCost}
                    onChange={(e) => onChange(index, "monthlyCost", e.target.value)}
                    Icon={DollarSign}
                  />
                </td>
                <td className="block md:table-cell p-3 text-center">
                  <motion.button
                    onClick={() => onDelete(index)}
                    className="text-gray-500 hover:text-red-500"
                    title={expenseTable.deleteTitle}
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
      
      {/* Botón para agregar nuevo gasto y total acumulado */}
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
          {expenseTable.addButton}
        </Button>
        <span className="text-lg font-bold text-green-700">
          {expenseTable.total} {totalPlantCost.toFixed(2)}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseTable;
