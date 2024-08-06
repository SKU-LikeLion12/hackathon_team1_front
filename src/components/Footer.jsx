import React from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaPen,
  FaUser,
  FaHome,
  FaPencilAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const navigateToCommunity = () => {
    navigate("/community");
  };

  const navigateToMainpage = () => {
    navigate("/main");
  };

  const navigateToMypage = () => {
    navigate("/mypage");
  };
  return (
    <>
      {/* 메뉴 */}
      <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] flex justify-around items-center py-2 border-t bg-white">
        <button
          className="flex flex-col items-center"
          onClick={navigateToMypage}>
          <FaUser className="text-lg mb-0.5" />
          <span className="text-xs">마이페이지</span>
        </button>

        <button
          className="flex flex-col items-center"
          onClick={navigateToMainpage}>
          <FaHome className="text-lg mb-0.5" />
          <span className="text-xs">홈</span>
        </button>
        <button
          className="flex flex-col items-center"
          onClick={navigateToCommunity}>
          <FaPencilAlt className="text-lg mb-0.5" />
          <span className="text-xs">커뮤니티</span>
        </button>
      </footer>
    </>
  );
}
