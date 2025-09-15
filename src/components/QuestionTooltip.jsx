import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const QuestionTooltip = ({ hint, info }) => {
  const [isVisible, setIsVisible] = useState(false);
  if (!hint && !info) return null;
  
  return (
    <div className="relative inline-flex align-middle">
      <button 
        type="button"
        className="ml-1 text-gray-400 hover:text-gray-500 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        aria-label="More information"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div 
          className="absolute z-50 w-48 p-2 mt-1 text-xs text-gray-900 bg-white border border-gray-200 rounded-md shadow-lg -left-1/2 transform -translate-x-1/2"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {info || hint}
          <div className="absolute w-2 h-2 bg-white border-t border-l border-gray-200 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};

export default QuestionTooltip;
