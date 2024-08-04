import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { PiCigaretteFill } from "react-icons/pi";
import { FaWonSign } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { PiCoinsDuotone } from "react-icons/pi";
import { CgDanger } from "react-icons/cg";
import ProgressBar from "./ProgressBar.jsx"; // Import the ProgressBar component

export default function Mainpage() {
  return (
    <>
      <div>
        <img
          className="nonsmoking w-full h-[350px]"
          src="image/non-smoking.png"
        />
      </div>
      <div className="bg-[#F5F2EB] min-h-screen flex items-center justify-center">
        <div className="flex flex-col space-y-4">
          <div className="box border-2  rounded-3xl w-[370px] h-[270px] bg-white">
            <div className="text ml-7 mt-5 flex items-center font-bold">
              상태변화
              <Link to="/mainpage1">
                <IoIosArrowForward className="ml-[230px] " />
              </Link>
            </div>
            <div className="box2 border w-[250px] h-[80px] mt-[30px] ml-[60px] bg-[#F5F2EB] rounded-xl p-2 ml-[110px]">
              <div className="font-bold ml-3 text-[15px]">20분</div>
              <div className="ml-3 text-[9px]">
                심박수가 정상으로 돌아옵니다
              </div>
              <ProgressBar progress={30} />{" "}
              {/* Adjust the progress as needed */}
            </div>
            <div className="box3 border w-[250px] h-[80px] mt-[20px] ml-[60px] bg-[#F5F2EB] rounded-xl p-2 ml-[110px]">
              <div className="font-bold ml-3">8시간</div>
              <div className="ml-3 text-[9px]">진정하세요</div>
              <ProgressBar progress={40} />{" "}
              {/* Adjust the progress as needed */}
            </div>
          </div>
          <div className="box border-2 rounded-3xl w-[370px] h-[270px] bg-white">
            <div className="text ml-7 mt-5">
              <div className="font-bold">내 현황</div>
              <div className="mt-3 flex items-center">
                <PiCigaretteFill className="w-[25px] h-[25px]" />
                <div className="ml-3">피우지 않은 담배 갯수</div>
              </div>
              <div className="mt-3 flex items-center">
                <FaWonSign className="w-[25px] h-[25px]" />
                <div className="ml-3">절약한 금액</div>
                <div className="ml-auto text-[8px]">
                  <button className="w-[55px] h-[20px] rounded-lg bg-zinc-200 mr-[20px]">
                    자세히 보기
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <FaHeartCirclePlus className="w-[25px] h-[25px]" />
                <div className="ml-3">늘어난 수명</div>
                <div className="ml-auto text-[8px]">
                  <button className="w-[55px] h-[20px] rounded-lg bg-zinc-200  mr-[20px]">
                    자세히 보기
                  </button>
                </div>
              </div>
              <div className="w-full border-[0.5px] mt-6"></div>
              <div className="mt-3 flex items-center">
                <MdOutlineTipsAndUpdates className="w-[25px] h-[25px]" />
                <div className="ml-3 flex items-center">
                  금단현상 극복하기 <IoIosArrowForward className="ml-[123px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="box border-2 rounded-3xl w-[370px] h-[270px] bg-white">
            <div className="text ml-7 mt-5 font-bold">흡연 정보</div>

            <div className="flex items-center ml-5 mt-9">
              <FaRegCalendarAlt className="w-[25px] h-[25px]" />
              <div className="ml-3">총 흡연기간</div>
            </div>

            <div className="flex items-center ml-5 mt-9">
              <PiCoinsDuotone className="w-[25px] h-[25px]" />
              <div className="ml-3">소비한 금액</div>
            </div>

            <div className="flex items-center ml-5 mt-9">
              <CgDanger className="w-[25px] h-[25px]" />
              <div className="ml-3">삼킨 타르양</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
