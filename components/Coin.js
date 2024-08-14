import { useEffect, useRef, useState } from "react";
import "../styles/coin.css";

import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../store/mineSlice";

const Coin = ({ unitAmount = 1, project, isLandScape }) => {
  const dispatch = useDispatch();

  const { isMute } = useSelector((state) => state.mine);

  const [canPlayAudio, setCanPlayAudio] = useState(false);

  const coinRef = useRef(null);
  const [coinSize, setCoinSize] = useState(isLandScape ? 100 : 200);

  const handleTap = (event) => {
    const coin = coinRef.current;
    const rect = coin.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const tiltX = -y / 5;
    const tiltY = x / 5;

    coin.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    if (canPlayAudio) {
      const audio = new Audio("/audios/coin-pickup.mp3");
      audio.volume = 0.3;
      audio.play();
    }

    setTimeout(() => {
      coin.style.transform = "rotateX(0) rotateY(0)";
      coin.style.transform = null;
    }, 100);
  };

  const createSmallCoin = (event) => {
    dispatch(updateProject({ id: project.id, clicks: 1 }));

    // create a small coin
    const coin = document.createElement("div");
    coin.setAttribute(
      "class",
      "s-coin w-fit fixed flex text-white items-center text-sm z-10"
    );
    coin.innerHTML = `<img src="${
      project.image || "/images/coin2.jpeg"
    }" alt="Coin" width="30" height="30" class="rounded-full overflow-hidden" /> <span class="select-none">+${unitAmount}</span>`;
    coin.style.left = `${event.clientX - 15}px`;
    coin.style.top = "0px";
    document.body.appendChild(coin);

    let velocity = 0;
    let position = 0;
    const gravity = 0.6;
    let bounce = 0.7;
    let friction = 0.99;
    let rotationSpeed = Math.random() * 10 - 5;
    let rotation = 0;
    let lastTimestamp = performance.now();
    const floorY = window.innerHeight - window.innerHeight * 0.32;

    const animate = (timestamp) => {
      const deltaTime = (timestamp - lastTimestamp) / 16;
      lastTimestamp = timestamp;

      velocity += gravity * deltaTime;
      position += velocity * deltaTime;
      rotation += rotationSpeed * deltaTime;

      if (position > floorY) {
        position = floorY;
        velocity *= -bounce;
        rotationSpeed *= 0.9;
        bounce *= 0.9;

        if (Math.abs(velocity) < 2) {
          velocity = 0;
          rotationSpeed *= 0.8;
        }
      }

      velocity *= friction;
      rotationSpeed *= friction;

      coin.style.top = `${position}px`;
      coin.style.transform = `rotate(${rotation}deg)`;

      if (Math.abs(velocity) > 0.1 || position < floorY) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          coin.style.transition = "opacity 0.3s";
          coin.style.opacity = "0";
          setTimeout(() => coin.remove(), 300);
        }, 200);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    setCanPlayAudio(!isMute);

    coinRef.current.addEventListener("coinClick", (e) => {
      console.log("custom-e: ", e.detail);
    });
  }, []);

  useEffect(() => {
    setCanPlayAudio(!isMute);
  }, [isMute]);

  return (
    <div>
      <div
        ref={coinRef}
        className="c-coin rounded-full w-fit overflow-hidden shadow-lg transition-transform duration-100 mx-auto"
        onPointerDown={(e) => {
          // tilt the main coin
          // e.stopPropagation();
          handleTap(e);
          createSmallCoin(e);
        }}
      >
        <img
          className="landscape:w-24"
          src={project.image || "/images/coin2.jpeg"}
          alt="Coin"
          width={coinSize}
          height={coinSize}
        />
      </div>
      <div className="c-shadow"></div>
    </div>
  );
};

export default Coin;
