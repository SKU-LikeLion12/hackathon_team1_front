import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { IoIosArrowForward } from "react-icons/io";
import { PiCigaretteFill } from "react-icons/pi";
import { FaWonSign } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { PiCoinsDuotone } from "react-icons/pi";
import { CgDanger } from "react-icons/cg";
import api from "../api/api.jsx";

import AmountModal from "../components/AmountModal.jsx";
import LifeModal from "../components/LifeModal.jsx";
import MainpagePreview from "../components/MainpagePreview.jsx";

export default function Mainpage() {
  const navigate = useNavigate();
  //자세히보기 모달
  const [AmountModalOpen, setAmountModalOpen] = useState(false);
  const [LifeModalOpen, setLifeModalOpen] = useState(false);

  const [initialData, setInitialData] = useState({
    cigarettesNotSmoked: null,
    savedMoney: null,
    increasedLifespan: null,
    totalSmokingDuration: null,
    totalSpentMoney: null,
    tar: null,
  });

  const navigateToStatus = () => {
    navigate("/mainstatus");
  };

  const handleAmountModal = () => {
    setAmountModalOpen(true);

    //모달창이 떠있을 때는 모달창 아래 부분 스크롤 못하도록
    document.body.style.overflow = "hidden";
  };

  const handleLifeModal = () => {
    setLifeModalOpen(true);

    //모달창이 떠있을 때는 모달창 아래 부분 스크롤 못하도록
    document.body.style.overflow = "hidden";
  };

  // 헬퍼 함수: 분을 년, 일, 시간으로 변환
  const convertMinutesToYearsDaysHours = (minutes) => {
    const totalHours = Math.floor(minutes / 60);
    const years = Math.floor(totalHours / (24 * 365));
    const days = Math.floor((totalHours % (24 * 365)) / 24);
    const hours = totalHours % 24;

    return `${years}년 ${days}일 ${hours}시간`;
  };

  // 헬퍼 함수: 일 단위를 년, 일, 시간으로 변환
  const convertDaysToYearsDaysHours = (days) => {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;

    return `${years}년 ${remainingDays}일`;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        //받은 데이터를 어떻게 처리할건지
        const response = await api().get("/main/info");

        // 응답 데이터에서 필요한 정보를 추출하여 상태 업데이트
        const {
          cigarettesNotSmoked,
          savedMoney,
          increasedLifespan,
          totalSmokingDuration,
          totalSpentMoney,
          tar,
        } = response.data; // 응답 데이터에서 필요한 필드 추출

        setInitialData({
          cigarettesNotSmoked,
          savedMoney,
          increasedLifespan,
          totalSmokingDuration,
          totalSpentMoney,
          tar,
        });
      } catch (error) {
        //에러
        console.error("loadIitialData error : ", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      loadInitialData();
    } else {
      //navigate("/login", { replace: true });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div>
        {AmountModalOpen && (
          <AmountModal AmountModalClose={setAmountModalOpen} />
        )}

        {LifeModalOpen && <LifeModal LifeModalClose={setLifeModalOpen} />}

        <Header />

        <div className="w-full h-full bg-[#F5F2EB]">
          <div className="flex justify-center items-center font-bold">
            <div className="w-[90%] my-8">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white h-200 w-200">
                로그아웃
              </button>

              <img src="/image/Mainpage_img.png" className="w-60 mx-auto" />

              <div className="text-center font-bold my-8">
                <div className="text-2xl">1일차 00:05</div>
                <div>금연할 수 있다!</div>
              </div>

              <div className="w-full h-full bg-white rounded-2xl mb-3 px-5 pt-4 pb-1">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-bold text-lg">상태변화</span>
                  <button onClick={navigateToStatus}>
                    <IoIosArrowForward size={20} className="text-[#BABABA]" />
                  </button>
                </div>
                <div className="px-2">
                  <MainpagePreview currentDuration={1440} />
                </div>
              </div>

              <div className="w-full h-full bg-white rounded-2xl mb-3 px-5 py-4">
                <div className="flex justify-between items-center font-bold text-lg mb-9">
                  내 현황
                </div>

                <div className="flex items-center mb-6">
                  <PiCigaretteFill
                    size={25}
                    className="text-[#265794] ml-2 mr-5"
                  />
                  <div>
                    <div className="text-[#3E3E3E] text-xs mb-2">
                      피우지 않은 담배 갯수
                    </div>
                    <div className="text-sm">
                      {initialData.cigarettesNotSmoked}개
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaWonSign size={25} className="text-[#265794] ml-2 mr-5" />
                    <div>
                      <div className="text-[#3E3E3E] text-xs mb-2">
                        절약한 금액(₩)
                      </div>
                      <div className="text-sm">{initialData.savedMoney}원</div>
                    </div>
                  </div>
                  <button
                    className="bg-[#F4F4F4] text-[#555555] rounded-lg text-xs px-2 py-1"
                    onClick={handleAmountModal}>
                    자세히 보기
                  </button>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaHeartCirclePlus
                      size={25}
                      className="text-[#265794] ml-2 mr-5"
                    />
                    <div>
                      <div className="text-[#3E3E3E] text-xs mb-2">
                        늘어난 수명
                      </div>
                      <div className="text-sm">
                        {convertMinutesToYearsDaysHours(
                          initialData.increasedLifespan
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    className="bg-[#F4F4F4] text-[#555555] rounded-lg text-xs px-2 py-1"
                    onClick={handleLifeModal}>
                    자세히 보기
                  </button>
                </div>
              </div>

              <div className="w-full h-full bg-white rounded-2xl px-5 py-4">
                <div className="flex justify-between items-center font-bold text-lg mb-9">
                  흡연정보
                </div>

                <div className="flex items-center mb-6">
                  <FaRegCalendarAlt
                    size={25}
                    className="text-[#265794] ml-2 mr-5"
                  />
                  <div>
                    <div className="text-[#3E3E3E] text-xs mb-2">
                      총 흡연기간
                    </div>
                    <div className="text-sm">
                      {convertDaysToYearsDaysHours(
                        initialData.totalSmokingDuration
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <PiCoinsDuotone
                    size={25}
                    className="text-[#265794] ml-2 mr-5"
                  />
                  <div>
                    <div className="text-[#3E3E3E] text-xs mb-2">
                      소비한 금액(₩)
                    </div>
                    <div className="text-sm">
                      {initialData.totalSpentMoney}원
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <CgDanger size={25} className="text-[#265794] ml-2 mr-5" />
                  <div>
                    <div className="text-[#3E3E3E] text-xs mb-2">
                      삼킨 타르 양
                    </div>
                    <div className="text-sm">{initialData.tar}mg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
