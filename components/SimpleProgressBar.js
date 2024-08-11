import React from "react";

const SimpleProgressBar = ({ progress, currentVal, maxVal }) => {
  return (
    <div className="text-sm">
      <div
        className="mt-1 h-2 bg-gray-500 w-full overflow-hidden"
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
      {/* <div className="flex justify-between mx-4 text-white font-bold">
        <span>0</span>
        <span>{maxVal}</span>
      </div> */}
      {/* <div className="mx-auto w-fit text-white text-xl font-bergen">
        {`${progress.toFixed(2)}%`}
      </div> */}
    </div>
  );
};

export default SimpleProgressBar;
