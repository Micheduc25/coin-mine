import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "@/contexts/NotificationContext";
import { toggleMute } from "@/store/mineSlice";
import AirDropCoin from "@/components/AirDropCoin";
import AirdropForm from "@/components/AridropForm";
import "@/styles/AirDrop.css";

const AirDropPage = () => {
  const [balance, setBalance] = useState(1254);
  const [clicks, setClicks] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);

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
    setBalance((prev) => prev + 1);
    setClicks((prev) => prev + 1);
  };

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandscape(true);
    }
  }, []);

  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", formData);
    setHasSubmittedForm(true);
  };

  return (
    <div
      className="h-screen relative text-white"
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
      {!hasSubmittedForm ? (
        <AirdropForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          <div
            className="absolute right-5 top-5 text-white z-10 cursor-pointer"
            onClick={toggleSound}
          >
            {isMute ? (
              <i className="fi fi-sr-volume-slash"></i>
            ) : (
              <i className="fi fi-sr-volume"></i>
            )}
          </div>

          <div className="page-background h-full w-full absolute overflow-hidden -z-10">
            <div className="bg-slice1"></div>
            <div className="bg-slice2"></div>
          </div>

          <div className="flex flex-col items-center justify-between h-[80%]">
            <div className="flex justify-center items-center mt-16 mb-8 text-2xl">
              <i className="fi fi-sr-sack-dollar mr-2"></i>
              <span className="font-bergen">{balance}</span>
            </div>
            <AirDropCoin onTap={handleCoinTap} />
            <div className="flex justify-center text-white text-2xl"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default AirDropPage;
