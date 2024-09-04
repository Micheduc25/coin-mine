import "@/styles/Wallet.css";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateWallet, resetWallet } from "@/store/walletSlice";
import { useNotification } from "@/contexts/NotificationContext";
import ProjectItem from "@/components/ProjectItem";

const Wallet = () => {
  const [isLandscape, setIsLandScape] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { wallet } = useSelector((state) => state.wallet);
  const { projects } = useSelector((state) => state.mine);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandScape(true);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const connectWallet = () => {
    if (!wallet.id) {
      dispatch(updateWallet({ id: "0x123EFABC2334W", balance: 1000 })); // later make call to real wallet api
    } else {
      showNotification("You are already connected", "info", 4000);
    }
  };

  const handleLogout = () => {
    dispatch(resetWallet());
    showNotification("You have been logged out", "info", 4000);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
      {!wallet.id ? (
        <div className="connect-but-container h-screen flex items-center justify-center">
          <button
            onClick={connectWallet}
            className="rounded-lg px-12 py-4 text-white bg-app-pink bg-opacity-50 text-2xl shadow-lg hover:bg-opacity-60 transition-all"
          >
            Connect
          </button>
        </div>
      ) : (
        <div>
          <div
            className="relative ml-auto mr-2 mt-4 mb-24 w-fit"
            ref={dropdownRef}
          >
            <button
              onClick={toggleDropdown}
              className="border-2 border-white rounded-lg text-ellipsis max-w-64 py-2 px-4 text-center text-white bg-white bg-opacity-30 hover:bg-opacity-40 transition-all"
            >
              {wallet.id.slice(0, 6)}...{wallet.id.slice(-4)}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-white text-5xl font-bergen font-bold mx-auto text-center mb-12">
            {wallet.balance} SOL
          </div>

          <div className="flex justify-between mt-8 max-w-[300px] mx-auto">
            <button className="rounded-lg px-2 py-2 w-5/12 text-white bg-transparent border-2 border-app-pink bg-opacity-50 text-2xl shadow-lg hover:bg-opacity-60 transition-all">
              Receive
            </button>
            <button className="rounded-lg px-2 py-2 w-5/12 text-white bg-app-pink bg-opacity-50 text-2xl shadow-lg hover:bg-opacity-60 transition-all ml-4">
              Send
            </button>
          </div>

          <div className="px-4">
            <div className="text-white text-2xl font-bergen font-bold mx-auto text-center mt-12">
              Minted Projects
            </div>
            {projects.slice(0, 15).map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
