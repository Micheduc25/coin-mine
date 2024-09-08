import React, { useState } from "react";
import "@/styles/IconButton.css";
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 -top-10 left-1/2 transform -translate-x-1/2">
          {content}
        </div>
      )}
    </div>
  );
};

const IconButton = ({ icon: Icon, onClick, ariaLabel, gradientClass }) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    }}
    aria-label={ariaLabel}
    className={`p-3 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-300 ease-in-out transform hover:scale-110 ${gradientClass}`}
  >
    <Icon className="w-4 h-4" />
  </button>
);

export { Tooltip, IconButton };
