import { useEffect, useState } from "react";
import NavBarItem from "./NavBarItem";

import "@/styles/NavBar.css";

export default function BottomNavBar({ bottom = 24 }) {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandscape(true);
    }
  }, []);

  return (
    <nav
      id="bottom-nav"
      style={{ bottom: `${bottom}px` }}
      className={`${isLandscape ? "landscape" : ""}`}
    >
      <div className="container flex justify-between">
        <NavBarItem text="Mine" href="/">
          <i className="fi fi-br-pickaxe"></i>
        </NavBarItem>
        <NavBarItem text="Wallet" href="/wallet">
          <i className="fi fi-sr-wallet"></i>
        </NavBarItem>
        <NavBarItem text="Transactions" href="/transactions">
          <i className="fi fi-bs-money-transfer-coin-arrow"></i>
        </NavBarItem>
        <NavBarItem text="Projet" href="/projet">
          <i className="fi fi-sr-crypto-calendar"></i>
        </NavBarItem>
        <NavBarItem text="AirDrop" href="/airdrop">
          <i className="fi fi-ss-parachute-box"></i>
        </NavBarItem>
      </div>
    </nav>
  );
}
