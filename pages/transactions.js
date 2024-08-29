import TabBar from "@/components/TabBar";
import TransactionItem from "@/components/TransactionItem";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const Transactions = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  const [tabs, setTabs] = useState([
    {
      label: "Mint",
      content: null,
    },
    {
      label: "Buy",
      content: null,
    },
    {
      label: "Sell",
      content: null,
    },
  ]);

  const { wallet, transactions } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandscape(true);
    }

    const mintTransactions = transactions.filter(
      (transaction) => transaction.type === "mint"
    );

    const buyTransactions = transactions.filter(
      (transaction) => transaction.type === "buy"
    );

    const sellTransactions = transactions.filter(
      (transaction) => transaction.type === "sell"
    );

    setTabs([
      {
        label: `Mint (${mintTransactions.length})`,
        content: (
          <div>
            {mintTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ),
      },
      {
        label: `Buy (${buyTransactions.length})`,
        content: (
          <div>
            {buyTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ),
      },
      {
        label: `Sell (${sellTransactions.length})`,
        content: (
          <div>
            {sellTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ),
      },
    ]);
  }, []);
  return (
    <div
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
      <TabBar tabs={tabs} />
    </div>
  );
};

export default Transactions;
