import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircle } from "react-icons/fa";

const ProgressStep = ({ status }) => {
  return (
    <div className="relative flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={`w-[24px] h-[24px] rounded-full flex items-center justify-center ${status === "completed" ? "bg-green-500" : "bg-gray-300"}`}>
          {status === "completed" ? (
            <IoIosCheckmarkCircle className="text-white" />
          ) : (
            <FaCircle className="text-white" />
          )}
        </div>
        <div
          className={`w-[2px] h-full ${status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
      </div>
    </div>
  );
};

export default ProgressStep;
