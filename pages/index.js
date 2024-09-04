import "@/styles/Home.css";

import { useSelector, useDispatch } from "react-redux";
import { toggleMute } from "@/store/mineSlice";
import { resetWallet } from "@/store/walletSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNotification } from "@/contexts/NotificationContext";

import CubeCarousel from "@/components/CubeCarousel";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const { projects, isMute } = useSelector((state) => state.mine);
  const { wallet } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const toggleSound = () => {
    dispatch(toggleMute());

    showNotification(
      `Audio ${!isMute ? "turned off" : "turned on"}`,
      "info",
      1500
    );
  };

  const logoutUser = () => {
    dispatch(resetWallet());
    showNotification("You have been logged out", "info", 4000);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="overflow-hidden">
      {wallet.id && (
        <div className="absolute top-2 right-3 z-10">
          <div
            className="relative cursor-pointer flex grow-0  justify-center"
            onClick={toggleDropdown}
          >
            {wallet.avatar ? (
              <img
                src={wallet.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <i className="fi fi-sr-user text-center w-10 h-10 bg-gray-200 p-2 rounded-full"></i>
            )}
            {showDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className={`absolute ${
          wallet.id ? "right-16" : "right-5"
        } top-5 text-white z-10`}
        onClick={toggleSound}
      >
        {isMute ? (
          <i className="fi fi-sr-volume-slash"></i>
        ) : (
          <i className="fi fi-sr-volume"></i>
        )}
      </div>

      <CubeCarousel projects={projects}></CubeCarousel>
    </div>
  );
}

export default Home;
