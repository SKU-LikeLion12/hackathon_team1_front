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

import ProgressBar from "./ProgressBar.jsx"; // Import the ProgressBar component

import AmountModal from "../components/AmountModal.jsx";
import LifeModal from "../components/LifeModal.jsx";

export default function Mainpage() {
  const navigate = useNavigate();
  //자세히보기 모달
  const [AmountModalOpen, setAmountModalOpen] = useState(false);
  const [LifeModalOpen, setLifeModalOpen] = useState(false);

  const [noSmokedCigas, setNoSmokedCigas] = useState(null);
  const [savedAmount, setSavedAmount] = useState(null);
  const [increasedLifespan, setIncreasedLifespan] = useState(null);
  const [smokeInfo, setSmokeInfo] = useState(null);
  const [spentAmount, setSpentAmount] = useState(null);
  const [tar, setTar] = useState(null);

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

  /* useEffect(() => {
    const loadInitialData = async () => {
      try {
        //받은 데이터를 어떻게 처리할건지
        const response = await api().get("/main/info");
        setNoSmokedCigas(response.data.noSmokedCigas);
        setSmokeInfo(response.data.smokeinfo);
        setSpentAmount(response.data.setSpentAmount);
        setTar(response.data.tar);
        setIncreasedLifespan(response.data.setIncreasedLifespan);
        setSavedAmount(response.data.setSavedAmount);

        // 필요한 데이터만 빼서 출력
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
  }, []); */

  return (
    <>
      <div>
        {AmountModalOpen && (
          <AmountModal AmountModalClose={setAmountModalOpen} />
        )}

        {LifeModalOpen && <LifeModal LifeModalClose={setLifeModalOpen} />}

        <Header />

        <div>
          <img src="/image/non-smoking.png" className="w-full" />
        </div>

        <div className="w-full h-full bg-[#F5F2EB]">
          <div className="flex justify-center items-center font-bold">
            <div className="w-[90%] my-8">
              <div className="w-full h-full bg-white rounded-2xl mb-3 px-5 py-4">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-bold text-lg">상태변화</span>
                  <button onClick={navigateToStatus}>
                    <IoIosArrowForward size={20} className="text-[#BABABA]" />
                  </button>
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
                    <div className="text-sm">120개</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaWonSign size={25} className="text-[#265794] ml-2 mr-5" />
                    <div>
                      <div className="text-[#3E3E3E] text-xs mb-2">
                        절약한 금액(₩)
                      </div>
                      <div className="text-sm">120개</div>
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
                      <div className="text-sm">120개</div>
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
                    <div className="text-sm">120개</div>
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
                    <div className="text-sm">120개</div>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <CgDanger size={25} className="text-[#265794] ml-2 mr-5" />
                  <div>
                    <div className="text-[#3E3E3E] text-xs mb-2">
                      삼킨 타르 양
                    </div>
                    <div className="text-sm">120개</div>
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
