import React from "react";
import Image from "next/image";
import Link from "next/link";

const TransactionItem = ({ transaction }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Link
      href={{ pathname: "/transaction", query: { txId: transaction.id } }}
      className="transaction-item flex w-full bg-primary-dark rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4"
    >
      <div className="flex-grow p-4 flex items-center">
        <Image
          className="rounded-full mr-4"
          src={`/images/coin.png`}
          alt={transaction.cryptoType}
          width={40}
          height={40}
        />
        <div className="flex-grow">
          <div className="text-lg font-semibold text-white">
            {transaction.cryptoType} Transaction
          </div>
          <div className="text-sm text-gray-400">
            {formatDate(transaction.date)}
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-gray-700 p-4 flex flex-col justify-center items-end">
        <div className="flex items-center justify-end mb-2">
          <span className="mr-2 text-white font-bold">
            {transaction.amount}
          </span>
          <span className="text-gray-300">{transaction.cryptoType}</span>
        </div>
        <div className={`font-semibold ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </div>
      </div>
    </Link>
  );
};

export default TransactionItem;
