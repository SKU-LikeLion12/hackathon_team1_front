import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Heart from "../animation/Heart";
import api from "../api/api";

export default function LifeModal(props) {
  const { LifeModalClose, increasedLifespan } = props;

  const [dailyCount, setdailyCount] = useState(12);

  useEffect(() => {
    const getDailyCount = async () => {
      try {
        const response = await api().get("/main/info/today");
        const cigaCount = response.data;
        setdailyCount(cigaCount);
      } catch (error) {
        console.error("getDailyCount response error : ", error);
      }
    };

    getDailyCount();
  }, []);

  const [lifespanToSave, setLifespanToSave] = useState([
    { period: "1주", lifespan: "" },
    { period: "1개월", lifespan: "" },
    { period: "1년", lifespan: "" },
    { period: "5년", lifespan: "" },
    { period: "10년", lifespan: "" },
    { period: "20년", lifespan: "" },
  ]);

  useEffect(() => {
    const calculateLifespan = (minutes) => {
      const years = Math.floor(minutes / (365 * 24 * 60));
      minutes %= 365 * 24 * 60;
      const months = Math.floor(minutes / (30 * 24 * 60));
      minutes %= 30 * 24 * 60;
      const days = Math.floor(minutes / (24 * 60));
      minutes %= 24 * 60;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      // 유효한 시간만 배열에 담기
      const lifespanParts = [];
      if (years > 0) lifespanParts.push(`${years}년`);
      if (months > 0) lifespanParts.push(`${months}개월`);
      if (days > 0) lifespanParts.push(`${days}일`);
      if (hours > 0) lifespanParts.push(`${hours}시간`);
      if (mins > 0) lifespanParts.push(`${mins}분`);

      return lifespanParts.length > 0 ? lifespanParts.join(" ") : "0분"; // 모든 값이 0일 경우 '0분' 반환
    };

    const updatedLifespan = lifespanToSave.map((item) => {
      let days;
      switch (item.period) {
        case "1주":
          days = 7;
          break;
        case "1개월":
          days = 30;
          break;
        case "1년":
          days = 365;
          break;
        case "5년":
          days = 365 * 5;
          break;
        case "10년":
          days = 365 * 10;
          break;
        case "20년":
          days = 365 * 20;
          break;
        default:
          days = 0;
      }
      const minutes = dailyCount * 11 * days;
      return { ...item, lifespan: calculateLifespan(minutes) };
    });

    setLifespanToSave(updatedLifespan);
  }, [dailyCount]);

  const handleModalClose = () => {
    LifeModalClose(false);
    document.body.style.overflow = "unset";
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 max-w-[500px] min-h-screen mx-auto overflow-x-hidden overflow-y-auto bg-[#CDCDCD]/[.3] select-none">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-[75%]">
            <div className="w-full min-h-[530px] bg-white rounded-2xl drop-shadow-xl">
              <div className="w-[80%] min-h-[530px] mx-auto py-10 text-center flex flex-col justify-center items-center">
                <div className="h-32 w-32">
                  <Heart />
                </div>

                <div>
                  <p className="text-xl font-bold mb-2">절약된 수명</p>
                  <p className="text-lg font-bold">{increasedLifespan}</p>
                </div>

                <div className="w-full h-[140px] rounded-lg bg-[#F3F3F3] text-[13px] font-bold my-10 px-5 py-2 flex flex-col justify-center">
                  {lifespanToSave.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <p>{item.period}</p>
                      <p>{item.lifespan}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleModalClose}
                  className="w-full h-14 bg-[#93BF66] rounded-lg text-white font-bold">
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}
