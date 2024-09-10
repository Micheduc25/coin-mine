import "@/styles/ProjectItem.css";

import Link from "next/link";

import { CandlestickChart, Wallet, X } from "lucide-react";
import { Tooltip, IconButton } from "@/components/IconButton";
import { useState } from "react";

const TransferPopup = ({ onClose, onSubmit }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ to, amount });
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-primary-dark rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Transfert</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="to"
              className="block text-sm font-medium text-white"
            >
              To
            </label>
            <input
              type="text"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Wallet address"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-white"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:from-green-500 hover:to-cyan-600 transition-all duration-300"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

const WalletProjectItem = ({ project }) => {
  const [isTransferPopupOpen, setIsTransferPopupOpen] = useState(false);

  const handleTransfer = (transferData) => {
    console.log("Transfer data:", transferData);
    // we will add transfer logic here
  };
  return (
    <>
      <Link
        href={{ pathname: "/", query: { projectId: project.id } }}
        className="p-item flex w-full text-white"
      >
        <div className="project-shape shape-l mr-24 p-2 flex items-center">
          <img
            className="rounded-full"
            src={project.image}
            alt={project.name}
            width={40}
            height={40}
          />

          <div className="absolute left-12 z-10 ml-4 w-4/6">
            <div className="text-lg font-semibold">{project.name}</div>
            <div className="text-sm">{project.maxVal || 1000}</div>
          </div>
        </div>
        <div className="project-shape shape-r">
          <div className="absolute right-2 z-10 h-full w-full pt-2 flex flex-col justify-center">
            <div className="flex justify-end items-center space-x-2 -mt-2">
              <Tooltip content="Trade">
                <IconButton
                  icon={CandlestickChart}
                  onClick={(e) => {}}
                  ariaLabel="Trade"
                  gradientClass="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50"
                />
              </Tooltip>
              <Tooltip content="Transfer">
                <IconButton
                  icon={Wallet}
                  onClick={(e) => {
                    setIsTransferPopupOpen(true);
                  }}
                  ariaLabel="Transfer"
                  gradientClass="bg-gradient-to-r from-green-400 to-cyan-500 shadow-lg shadow-green-500/50"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </Link>

      {isTransferPopupOpen && (
        <TransferPopup
          onClose={() => setIsTransferPopupOpen(false)}
          onSubmit={handleTransfer}
        />
      )}
    </>
  );
};
export default WalletProjectItem;
