import React, { useState, useEffect } from "react";
import "../styles/CountdownTimer.css";

const CountdownCircle = ({ diameter = 50, onEnd = () => {} }) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [fontSize, setFontSize] = useState(0.5);
  let interval;
  let fontInterval;

  useEffect(() => {
    interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev - 1 <= 0) {
          clearInterval(interval);
          clearInterval(fontInterval);
          onEnd();
        }

        return prev - 1;
      });
    }, 1000);

    fontInterval = setInterval(() => {
      setFontSize((prev) => (prev === 0.5 ? 1 : 0.5));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(fontInterval);
    };
  }, []);

  //   useEffect(() => {
  //     console.log("secondsLeft", secondsLeft);
  //     if (secondsLeft <= 0) {
  //       clearInterval(interval);
  //       clearInterval(fontInterval);
  //     }
  //   }, [secondsLeft]);

  const radius = diameter / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (secondsLeft / 60) * circumference;

  return (
    <div
      id="countdown-timer"
      className="countdown-timer"
      style={{ width: diameter, height: diameter }}
    >
      <svg className="progress-ring" width={diameter} height={diameter}>
        <circle
          className="progress-ring__background"
          stroke="lightgray"
          strokeWidth="4"
          fill="transparent"
          r={radius - 2}
          cx={radius}
          cy={radius}
        />
        <circle
          className="progress-ring__circle"
          stroke="#fc639c"
          strokeWidth="4"
          fill="transparent"
          r={radius - 2}
          cx={radius}
          cy={radius}
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
      </svg>
      <div className="timer-text" style={{ fontSize: `${fontSize}em` }}>
        {secondsLeft}
      </div>
    </div>
  );
};

export default CountdownCircle;
