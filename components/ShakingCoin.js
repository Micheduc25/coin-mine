import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import uniqueId from "lodash/uniqueId";

const ShakingCoin = ({ unitAmount, onTap }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [tinyCoins, setTinyCoins] = useState([]);

  const [coinCount, setCoinCount] = useState(0);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);

    // Generate a random x value for horizontal movement
    const randomX = Math.floor(Math.random() * 400) - 200; // Random value between -200 and 200

    // Add a new tiny coin with a unique ID and random x value
    setTinyCoins((prevCoins) => [
      ...prevCoins,
      { id: uniqueId("tinyCoin_"), createdAt: Date.now(), x: randomX },
    ]);

    setCoinCount(coinCount + unitAmount);

    // Play sound
    const audio = new Audio("/audios/coin-pickup.mp3");
    audio.volume = 0.3;
    audio.play();

    if (onTap) onTap(coinCount);
  };

  // Remove coin after animation
  const removeCoin = (coinId) => {
    setTinyCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== coinId));
  };

  const shakeVariants = {
    shake: {
      x: [0, -15, 15, -15, 15, -10, 10, -5, 5, 0],
      y: [0, 2, -2, 2, -2, 1, -1, 1, -1, 0],
      rotateZ: [0, -2, 2, -2, 2, -1, 1, -1, 1, 0],
      transition: {
        duration: 0.8,
        ease: [0.36, 0.07, 0.19, 0.97],
      },
    },
  };

  return (
    <div className="relative -mt-20">
      <motion.div
        animate={isShaking ? "shake" : "idle"}
        variants={shakeVariants}
        onClick={handleClick}
        className="coin flex justify-center w-fit mx-auto"
        style={{ cursor: "pointer" }}
      >
        <Image src="/images/coin.png" alt="Coin" width={200} height={200} />
      </motion.div>
      <AnimatePresence>
        {tinyCoins.map((coin) => (
          <motion.div
            key={coin.id}
            className="tiny-coin-text flex text-white items-center"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0, x: 0, y: 0 },
              animate: {
                opacity: 1,
                x: coin.x,
                y: [0, -100, 200, 100, 200, 150, 200, 185, 200],
                transition: { duration: 1, ease: "easeOut" },
              },
              exit: { opacity: 0, transition: { duration: 0.3, delay: 1 } },
            }}
            onAnimationComplete={() => removeCoin(coin.id)}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Image
              src="/images/coin.png"
              alt="Tiny Coin"
              width={50}
              height={50}
            />
            <span
              className="font-bold"
              style={{ marginLeft: "5px", fontSize: "14px" }}
            >
              +{unitAmount}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ShakingCoin;
