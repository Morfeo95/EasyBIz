import React from 'react';
import { Info } from 'lucide-react';

const HelpTooltip = ({ text }) => {
  return (
    <span className="ml-1 text-xs text-gray-500 " title={text}
      data-html2canvas-ignore="true"
    >
      <Info size={14} className='focus:outline-none no-print' />
    </span>
  );
};

export default HelpTooltip;
