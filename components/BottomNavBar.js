import NavBarItem from "./NavBarItem";

export default function BottomNavBar({ bottom = 24 }) {
  return (
    <nav
      id="bottom-nav"
      style={{ bottom: `${bottom}px` }}
      className={`fixed bg-primary-dark shadow-xl rounded-lg  py-[5px] px-[3px] left-1/2 -translate-x-1/2 z-20`}
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
          <i className="fi fi-bs-humanitarian-mission"></i>
        </NavBarItem>
      </div>
    </nav>
  );
}
