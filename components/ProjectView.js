import Coin from "@/components/Coin";
import CountdownCircle from "@/components/CountDownCircle";
import ProgressBar from "@/components/ProgressBar";
import "@/styles/Home.css";
import { useEffect, useState, useRef } from "react";
import { incrementClicks, updateBalance } from "../store/mineSlice";
import { useSelector, useDispatch } from "react-redux";

function ProjectView({ projectName }) {
  const [count, setCount] = useState(0);
  const [canCollect, setCanCollect] = useState(false);
  const [maxCount, setMaxCount] = useState(10000);

  const dispatch = useDispatch();

  const collectButtonRef = useRef(null);
  const balanceContainerRef = useRef(null);

  const { clicks, balance } = useSelector((state) => state.mine);

  const onCountEnd = () => {
    setCanCollect(true);
  };

  function createRisingNumber(value) {
    const number = document.createElement("div");
    number.className = "number";
    number.textContent = `+$${value}`;

    const buttonRect = collectButtonRef.current.getBoundingClientRect();
    const balanceRect = balanceContainerRef.current.getBoundingClientRect();

    const startX = Math.random() * (window.innerWidth - 50);
    const startY = buttonRect.top;

    number.style.left = `${startX}px`;
    number.style.top = `${startY}px`;

    document.body.appendChild(number);

    setTimeout(() => {
      number.style.top = `${balanceRect.top + balanceRect.height / 2}px`;
      number.style.left = `${balanceRect.left + balanceRect.width / 2}px`;
      number.style.opacity = 1;

      setTimeout(() => {
        number.remove();
      }, 2000);
    }, 50);
  }

  function animateNumbers() {
    let remainingValue = clicks;
    let index = 0;

    function createNextNumber() {
      if (remainingValue > 0) {
        const increment = Math.min(
          Math.floor(Math.random() * remainingValue) + 1,
          remainingValue
        );
        remainingValue -= increment;

        setTimeout(() => {
          createRisingNumber(increment);
          createNextNumber();
        }, index * 200);

        index++;
      }
    }

    createNextNumber();
  }

  const animateBalanceIncrement = (newBalance) => {
    const increment = newBalance - balance;
    const step = Math.floor(increment / 100);

    let current = balance;

    const interval = setInterval(() => {
      current += step;

      dispatch(updateBalance(current));

      if (current >= newBalance) {
        clearInterval(interval);
        current = newBalance;
      }

      // setCount((prev) => prev + 1);
    }, 20);
  };

  const handleCollect = () => {
    setCanCollect(false);
    animateNumbers();
    animateBalanceIncrement(balance + clicks);
  };

  return (
    <main className="h-screen relative">
      <div className="page-background h-full w-full absolute overflow-hidden -z-10 ">
        <div className="bg-slice1"></div>
        <div className="bg-slice2"></div>
      </div>

      <div className="page-content h-[94%] w-full flex flex-col justify-between overflow-x-hidden pb-20 pt-10 px-4">
        <div className="items-center text-white text-xl w-full">
          <h2 className="text-3xl text-white text-center font-bold mb-4">
            {projectName}
          </h2>
          <div
            ref={balanceContainerRef}
            className="flex justify-center items-center mb-10"
          >
            <i className="fi fi-sr-sack-dollar mr-2 "></i>
            <span>{balance}</span>
          </div>
          <ProgressBar
            currentCount={count}
            totalCount={maxCount}
            balance={0}
            mode="date"
            minDate={"2024-07-12"}
            maxDate={"2024-08-20"}
          />
        </div>

        <Coin />

        <div className="flex flex-col mx-4">
          <div className="flex justify-between text-white text-2xl">
            <div className="flex justify-center items-end h-[50px]">
              <i className="fi fi-sr-tap mr-2 "></i>
              <span>{clicks}</span>
            </div>

            {!canCollect && <CountdownCircle onEnd={onCountEnd} />}
          </div>
          <button
            ref={collectButtonRef}
            disabled={!canCollect}
            onClick={handleCollect}
            className={` collect-button  ${
              canCollect ? "bg-app-pink" : "bg-gray-400"
            }`}
          >
            Collect
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProjectView;
