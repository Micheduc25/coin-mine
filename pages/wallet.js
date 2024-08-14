import "@/styles/Wallet.css";
import { useEffect, useState } from "react";
const Wallet = () => {
  const [isLandscape, setIsLandScape] = useState(false);
  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandScape(true);
    }
  }, []);
  return (
    <div
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
      Wallet
    </div>
  );
};

export default Wallet;
