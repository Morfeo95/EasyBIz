import React, { useState } from 'react';
import { Info } from 'lucide-react';

const HelpTooltip = ({ text }) => {
  const [visible, setVisible] = useState(false);

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  return (
    <span className="relative ml-1 text-xs text-gray-500" data-html2canvas-ignore="true">
      <button onClick={toggleTooltip} className="focus:outline-none no-print">
        <Info size={14} />
      </button>
      {visible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded z-10">
          {text}
        </div>
      )}
    </span>
  );
};

export default HelpTooltip;
