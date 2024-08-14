import React, { useState, useEffect } from "react";

const ProgressBar = ({
  currentCount,
  totalCount,

  minDate,
  maxDate,
  mode = "range",
}) => {
  const [progress, setProgress] = useState(0);

  function formatNumber(num) {
    const absNum = Math.abs(num);

    if (absNum >= 1e9) {
      const billions = absNum / 1e9;
      if (Number.isInteger(billions)) {
        return (num < 0 ? "-" : "") + billions + " B";
      }
    }

    if (absNum >= 1e6) {
      const millions = absNum / 1e6;
      if (Number.isInteger(millions) || millions.toFixed(1) % 1 === 0) {
        return (
          (num < 0 ? "-" : "") + millions.toFixed(1).replace(".0", "") + " M"
        );
      }
    }

    if (absNum >= 1e3) {
      const thousands = absNum / 1e3;
      if (Number.isInteger(thousands)) {
        return (num < 0 ? "-" : "") + thousands + " K";
      }
    }

    return num.toString();
  }

  const formateDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDateProgress = (minDate, maxDate) => {
    const today = new Date();
    const min = new Date(minDate);
    const max = new Date(maxDate);
    const total = max - min;
    const current = today - min;
    return (current / total) * 100;
  };

  useEffect(() => {
    if (mode === "date") {
      setProgress(calculateDateProgress(minDate, maxDate));
      return;
    }
    if (!totalCount || !currentCount) return;

    if (currentCount / totalCount >= 1) {
      setProgress(100);
      return;
    }

    setProgress((currentCount / totalCount) * 100);
  }, [currentCount, totalCount]);

  useEffect(() => {
    setProgress(
      mode === "range"
        ? (currentCount / totalCount) * 100
        : calculateDateProgress(minDate, maxDate)
    );
  }, []);

  return (
    <div className="text-sm">
      <div
        className="mx-4 mt-4 mb-1  h-3 bg-gray-500"
        style={{
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(to right, royalblue, hotpink)",
            borderRadius: "5px",
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
      {mode === "range" ? (
        <div className="flex justify-between mx-4 text-white font-bold">
          <span>0</span>

          <span>{formatNumber(totalCount)}</span>
        </div>
      ) : (
        <div className="flex justify-between mx-4 text-white font-bold">
          <span>{formateDate(minDate)}</span>

          <span>{formateDate(maxDate)}</span>
        </div>
      )}
      <div onClick={(e)=>{console.log(e.target)}} className="mx-auto w-fit text-white text-xl font-bergen">
        {`${progress.toFixed(2)} ${mode == "range" ? "%" : ""}`}
      </div>
    </div>
  );
};

export default ProgressBar;
