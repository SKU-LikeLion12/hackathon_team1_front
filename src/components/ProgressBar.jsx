import React from "react";

const ProgressBar = ({ percentage }) => {
  if (percentage >= 100) {
    return null; // 100%일 경우 아무것도 렌더링하지 않음
  }

  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-[#DED8CB]">
        <div
          style={{ width: `${percentage}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
