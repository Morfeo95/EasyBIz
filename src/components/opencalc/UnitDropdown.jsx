// Import useState hook from React to manage local component state
import { useState } from "react";
// Import a Label component for displaying the current selection
import Label from "./Label";
// Import custom hook for translations
import useTranslations from '../../hooks/useTranslations';

// Define the UnitDropdown component which accepts the current unit and an onSelect callback as props
const UnitDropdown = ({ unit, onSelect }) => {
  // Local state to manage whether the dropdown menu is open
  const [open, setOpen] = useState(false);
  // Retrieve translation messages using the custom hook
  const messages = useTranslations();
  
  // If translations are not loaded yet, return null to avoid rendering incomplete UI
  if (!messages) return null;

  // Destructure default label and options texts from the translations for the dropdown
  const { defaultLabel, options: optionsTexts } = messages.unitDropdown;

  // Define the available options for the dropdown
  const options = [
    { value: "pieza", label: optionsTexts.pieza },
    { value: "gramo", label: optionsTexts.gramo },
    { value: "litro", label: optionsTexts.litro }
  ];

  // Handler function for selecting an option from the dropdown
  const handleSelect = (selected) => {
    // Call the onSelect callback with the selected value
    onSelect(selected);
    // Close the dropdown menu after selection
    setOpen(false);
  };

  return (
    // Relative container to correctly position the dropdown list
    <div className="relative inline-block">
      {/* Display the current selected unit using the Label component. If no unit is selected, show the default label */}
      <Label text={options.find(opt => opt.value === unit)?.label || defaultLabel} onClick={() => setOpen(!open)} />
      {/* Render the dropdown options if open is true */}
      {open && (
        <div className="absolute mt-1 w-full bg-gray-100 border border-green-500 rounded-lg shadow-lg z-10">
          {/* Map through the options array and display each option */}
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-green-700"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Export the UnitDropdown component for use elsewhere in the application
export default UnitDropdown;
