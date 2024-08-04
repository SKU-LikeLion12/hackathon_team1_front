import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-[5px] mt-2">
      <div
        className="bg-green-400 h-[5px] rounded-full"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
