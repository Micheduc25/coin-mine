import AirDropCoin from "@/components/AirDropCoin";
import "@/styles/AirDrop.css";
import { useState } from "react";

import { useNotification } from "@/contexts/NotificationContext";
import { toggleMute } from "@/store/mineSlice";
import { useSelector, useDispatch } from "react-redux";

const AirDropPage = () => {
  const [balance, setBalance] = useState(1254);
  const [clicks, setClicks] = useState(0);

  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const { isMute } = useSelector((state) => state.mine);

  const toggleSound = () => {
    dispatch(toggleMute());

    showNotification(
      `Audio ${!isMute ? "turned off" : "turned on"}`,
      "info",
      1500
    );
  };

  const handleCoinTap = () => {
    setBalance((prev) => {
      return prev + 1;
    });

    setClicks((prev) => prev + 1);
  };

  return (
    <div className="h-screen relative text-white">
      {/* mute toggle button */}
      <div
        className="absolute right-5 top-5 text-white z-10"
        onClick={toggleSound}
      >
        {isMute ? (
          <i className="fi fi-sr-volume-slash"></i>
        ) : (
          <i className="fi fi-sr-volume"></i>
        )}
      </div>

      {/* aidrop page background */}
      <div className="page-background h-full w-full absolute overflow-hidden -z-10 ">
        <div className="bg-slice1"></div>
        <div className="bg-slice2"></div>
      </div>

      {/* airdrop page below */}

      <div className="flex flex-col items-center justify-between h-[80%]">
        <div className="flex justify-center items-center mt-16 mb-8 text-2xl">
          <i className="fi fi-sr-sack-dollar mr-2"></i>
          <span className="font-bergen">{balance}</span>
        </div>
        <AirDropCoin onTap={handleCoinTap} />

        <div className="flex justify-center text-white text-2xl">
          <div className="flex justify-center items-end h-[50px]">
            {/* <i className="fi fi-sr-tap mr-2 "></i> */}
            <span>{clicks}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDropPage;
