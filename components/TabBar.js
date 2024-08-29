import React, { useState } from "react";
import { motion } from "framer-motion";

const TabBar = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0 mt-6">
      <div className="flex flex-wrap sm:flex-nowrap sm:space-x-1 bg-transparent border-2 border-white p-1 rounded-xl">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-grow sm:flex-1 py-2 px-4 rounded-lg transition-colors duration-150 ${
              index !== tabs.length - 1 ? "sm:mb-0" : ""
            } ${
              activeTab === index
                ? "bg-white text-blue-600 shadow-md"
                : "text-white hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 relative">
        <motion.div
          className="absolute w-full"
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
};

export default TabBar;
