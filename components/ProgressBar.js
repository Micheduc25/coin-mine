import React, { useState, useEffect } from "react";

const ProgressBar = ({
  currentCount,
  totalCount,
  minValue,
  minDate,
  maxDate,
  mode = "range",
}) => {
  const [progress, setProgress] = useState(0);

  const formatNumber = (number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1) + "B";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

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
      <div className="mx-auto w-fit text-white font-bold">
        {`${progress.toFixed(2)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
