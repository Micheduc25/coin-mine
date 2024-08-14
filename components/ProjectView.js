import Coin from "@/components/Coin";
import CountdownCircle from "@/components/CountDownCircle";
import ProgressBar from "@/components/ProgressBar";
import "@/styles/Home.css";
import { useEffect, useState, useRef } from "react";
import { updateBalance, updateProject } from "../store/mineSlice";
import { useSelector, useDispatch } from "react-redux";
import TestCoin from "./TestCoin";

function ProjectView({ project, onCollectStart, onCollectEnd }) {
  const [canCollect, setCanCollect] = useState(false);

  const [isLandScape, setIsLandScape] = useState(false);

  const dispatch = useDispatch();

  const collectButtonRef = useRef(null);
  const balanceContainerRef = useRef(null);
  const pageContentRef = useRef(null);

  const { balance } = useSelector((state) => state.mine);

  const simulateCoinClick = (e) => {
    const customEvent = new CustomEvent("coinClick", {
      detail: e,
      bubbles: true,
      cancelable: true,
    });

    e.target.dispatchEvent(customEvent);
  };

  const onCountEnd = () => {
    setCanCollect(true);
  };

  function createRisingNumber(value) {
    const number = document.createElement("div");
    number.className = "number z-10";
    number.textContent = `+${value}`;

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
    let index = 0;
    if (onCollectStart) onCollectStart();

    function createNextNumber() {
      if (index < 40) {
        const increment = Math.floor(Math.random() * 100);
        setTimeout(() => {
          createRisingNumber(increment);
          createNextNumber();
        }, 50);

        index++;
      } else {
        if (onCollectEnd) {
          setTimeout(() => {
            onCollectEnd();
          }, 2000);
        }
      }
    }

    createNextNumber();
  }

  const animateBalanceIncrement = (newBalance) => {
    const increment = newBalance - balance;
    const step = Math.floor(increment / 200);
    const duration = 4000;

    let current = balance;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = elapsedTime / duration;

      current += step;

      dispatch(updateBalance(current));

      if (current >= newBalance) {
        current = newBalance;
      }

      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleCollect = () => {
    setCanCollect(false);
    animateNumbers();
    animateBalanceIncrement(balance + 1000); // change this later when we get balance from backend
  };

  useEffect(() => {
    const navBar = document.getElementById("bottom-nav");
    const pageContent = pageContentRef.current;

    const navBarHeight = navBar.getBoundingClientRect().height;

    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandScape(true);
      pageContent.style.height = `100%`;
    } else {
      pageContent.style.height = `${
        ((window.innerHeight - navBarHeight - 100) / window.innerHeight) * 100
      }%`;
    }

    screen.orientation.addEventListener("change", (e) => {
      console.log(e.target.type);

      setIsLandScape((prev) => {
        const isLandscapeNew =
          e.target.type === "landscape-primary" ||
          e.target.type === "landscape-secondary";
        if (prev !== isLandscapeNew) {
          window.location.reload();
          return isLandscapeNew;
        }
        return prev;
      });
    });
  }, []);

  return (
    <div className="h-screen relative">
      {/* <div className="page-background h-full w-full absolute overflow-hidden -z-10 ">
        <div className="bg-slice1"></div>
        <div className="bg-slice2"></div>
      </div> */}

      <div
        ref={pageContentRef}
        className="page-content h-[80%] landscape:h-full w-full flex flex-col justify-between overflow-x-hidden  pt-3 px-4"
      >
        <div className="items-center text-white text-xl w-full">
          <h2 className="text-3xl text-white text-center font-bold mb-6 ">
            {project.name}
          </h2>
          <div
            ref={balanceContainerRef}
            className="flex justify-center items-center mb-8 text-2xl"
          >
            <i className="fi fi-sr-sack-dollar mr-2"></i>
            <span className="font-bergen">{balance}</span>
          </div>
          <ProgressBar
            currentCount={project.currentVal}
            totalCount={project.maxVal}
            balance={balance}
            mode={project.mode}
            minDate={project.startDate}
            maxDate={project.endDate}
          />
        </div>

        {/* <div onClick={(e)=>{
          console.log(" I was clicked ohhhh")
        }} className="h-36 w-36 bg-green-500 mx-auto"></div> */}

        <Coin isLandScape={isLandScape} project={project} />

        <div className="flex flex-col mx-4">
          <div className="flex justify-between text-white text-2xl">
            <div className="flex justify-center items-end h-[50px]">
              <i className="fi fi-sr-tap mr-2 "></i>
              <span>{project.clicks}</span>
            </div>

            {!canCollect && <CountdownCircle onEnd={onCountEnd} />}
          </div>

          <div className="justify-center">
            <button
              ref={collectButtonRef}
              disabled={!canCollect}
              onClick={handleCollect}
              className={` collect-button z-10  ${
                canCollect
                  ? "bg-app-pink border-app-pink"
                  : "bg-gray-400 border-gray-400"
              }`}
            >
              Collect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
