import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

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
    daysSinceQuit: null,
    cigarettesNotSmoked: null,
    savedMoney: null,
    increasedLifespan: null,
    totalSmokingDuration: null,
    totalSpentMoney: null,
    tar: null,
  });

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

  // 시간 데이터를 형식화하는 함수
  const formatTime = (minutes) => {
    const years = Math.floor(minutes / 518400); // 1년 = 518400분
    const months = Math.floor((minutes % 518400) / 43200); // 1개월 = 43200분
    const days = Math.floor((minutes % 43200) / 1440); // 1일 = 1440분
    const hours = Math.floor((minutes % 1440) / 60); // 1시간 = 60분
    const mins = minutes % 60; // 나머지 분

    let result = [];
    if (years > 0) result.push(`${years}년`);
    if (months > 0) result.push(`${months}개월`);
    if (days > 0) result.push(`${days}일`);
    if (hours > 0) result.push(`${hours}시간`);
    if (mins > 0) result.push(`${mins}분`);

    // 모든 값이 0일 경우 "0분" 반환
    return result.length > 0 ? result.join(" ") : "0분";
  };

  const convertDaysToYMD = (days) => {
    const years = Math.floor(days / 365);
    days %= 365;
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;

    const parts = [];
    if (years > 0) parts.push(`${years}년`);
    if (months > 0) parts.push(`${months}개월`);
    if (remainingDays > 0) parts.push(`${remainingDays}일`);

    // 모든 값이 0일 경우 "0일" 반환
    return parts.length > 0 ? parts.join(" ") : "0일";
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        //받은 데이터를 어떻게 처리할건지
        const response = await api().get("/main/info");

        console.log(response.data);

        // 응답 데이터에서 필요한 정보를 추출하여 상태 업데이트
        const data = response.data;

        setInitialData({
          daysSinceQuit: data[0],
          cigarettesNotSmoked: data[1],
          savedMoney: data[2], // 24
          increasedLifespan: data[3],
          totalSmokingDuration: data[4],
          totalSpentMoney: data[5],
          tar: data[6],
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        } else {
          console.error("loadIitialData error : ", error);
        }
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      loadInitialData();
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  const navigateToStatus = () => {
    navigate("/mainstatus", {
      state: {
        daysSinceQuit: initialData.daysSinceQuit,
      },
    });
  };

  return (
    <>
      <div>
        {AmountModalOpen && (
          <AmountModal
            AmountModalClose={setAmountModalOpen}
            savedMoney={initialData.savedMoney}
          />
        )}

        {LifeModalOpen && (
          <LifeModal
            LifeModalClose={setLifeModalOpen}
            increasedLifespan={formatTime(initialData.increasedLifespan)}
          />
        )}

        <Header />

        <div className="w-full h-full bg-[#F5F2EB] select-none">
          <div className="flex justify-center items-center font-bold">
            <div className="w-[90%] mt-8 mb-20">
              <img src="/image/Mainpage_img.png" className="w-60 mx-auto" />

              <div className="text-center font-bold my-8">
                <div className="text-2xl">
                  {formatTime(initialData.daysSinceQuit)}
                </div>
                <div>금연할 수 있다!</div>
              </div>

              <div className="w-full h-full bg-white rounded-2xl mb-3 px-5 pt-4 pb-1">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-bold text-lg">상태변화</span>
                  <button onClick={navigateToStatus} className="pl-10 py-2">
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
                        {formatTime(initialData.increasedLifespan)}
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
                      {convertDaysToYMD(initialData.totalSmokingDuration)}
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
        <Footer />
      </div>
    </>
  );
}
