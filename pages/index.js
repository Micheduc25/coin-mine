import "@/styles/Home.css";

import { useSelector, useDispatch } from "react-redux";
import { toggleMute } from "@/store/mineSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNotification } from "@/contexts/NotificationContext";

import CubeCarousel from "@/components/CubeCarousel";
import { useEffect } from "react";

function Home() {
  const { projects, isMute } = useSelector((state) => state.mine);
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

  return (
    <div className="overflow-hidden">
      <CubeCarousel projects={projects}></CubeCarousel>

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
    </div>
  );
}

export default Home;
