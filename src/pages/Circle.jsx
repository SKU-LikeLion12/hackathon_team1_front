import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Circle = ({ status }) => {
  const bgColor =
    status === "completed"
      ? "bg-gray-500 "
      : status === "in-progress"
        ? "bg-green-500"
        : "bg-yellow-300";

  return (
    <div className="relative">
      <div>
        <FaCheckCircle
          className={`w-[24px] h-[24px] rounded-full -ml-7 ${bgColor}`}
        />
      </div>
    </div>
  );
};

export default Circle;
