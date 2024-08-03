import { useEffect, useRef } from "react";
import "../styles/coin.css";

import { useSelector, useDispatch } from "react-redux";
import { incrementClicks, updateBalance } from "../store/mineSlice";

const Coin = ({ unitAmount = 10 }) => {
  const dispatch = useDispatch();

  const coinRef = useRef(null);

  const handleTap = (event) => {
    const coin = coinRef.current;
    const rect = coin.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const tiltX = -y / 5;
    const tiltY = x / 5;

    coin.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    setTimeout(() => {
      coin.style.transform = "rotateX(0) rotateY(0)";
    }, 100);
  };

  const createSmallCoin = (event) => {
    // tilt the main coin
    handleTap(event);

    dispatch(incrementClicks());

    // create a small coin
    const coin = document.createElement("div");
    coin.setAttribute(
      "class",
      "s-coin rounded-full w-fit overflow-hidden fixed flex text-white items-center text-sm"
    );
    coin.innerHTML = `<img src="/images/coin.png" alt="Coin" width="30" height="30" /> <span>+${unitAmount}</span>`;
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
    const floorY = window.innerHeight - window.innerHeight * 0.26;

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
    coinRef.current.addEventListener("pointerdown", createSmallCoin);
  }, []);

  return (
    <div className="c-container w-fit mx-auto">
      <div
        ref={coinRef}
        className="c-coin rounded-full w-fit overflow-hidden shadow-lg transition-transform duration-100 mx-auto"
      >
        <img src="/images/coin.png" alt="Coin" width={200} height={200} />
        <div className="c-shadow"></div>
      </div>
    </div>
  );
};

export default Coin;
