import { useEffect, useState } from "react";

const Transactions = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandscape(true);
    }
  }, []);
  return (
    <div
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
      Transaction
    </div>
  );
};

export default Transactions;
