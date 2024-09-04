import TransactionItem from "@/components/TransactionItem";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Pagination from "@/components/Pagination";

const Transactions = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabItems, setActiveTabItems] = useState([]);

  const [tabs, setTabs] = useState(["Mint", "Buy", "Sell"]);

  const [itemsPerPage, setItemsPerPage] = useState(2);

  const [currentItems, setCurrentItems] = useState([]);

  const { transactions } = useSelector((state) => state.wallet);

  const onPageChange = (page) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setActiveTabItems(
      transactions.filter((item) => item.type == tabs[activeTab].toLowerCase())
    );

    setCurrentItems(
      transactions
        .filter((item) => item.type == tabs[activeTab].toLowerCase())
        .slice(indexOfFirstItem, indexOfLastItem)
    );
  };

  useEffect(() => {
    onPageChange(1);
  }, [itemsPerPage, activeTab]);

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandscape(true);
    }

    setItemsPerPage(Math.floor(window.innerHeight / 120));
  }, []);

  return (
    <div
      className="overflow-x-hidden"
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
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
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4 relative">
          <motion.div
            className=" w-full"
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentItems.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </motion.div>
        </div>
        {activeTabItems.length > itemsPerPage && (
          <Pagination
            totalItems={activeTabItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
