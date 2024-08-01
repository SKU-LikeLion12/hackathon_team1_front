import React, { useEffect, useState } from "react";

export default function BasicInfo() {
  const [quitDate, setQuitDate] = useState("");
  const [smokeDate, setSmokeDate] = useState("");
  const [minQuitDate, setMinQuitDate] = useState("");
  const [maxSmokeDate, setMaxSmokeDate] = useState("");
  const [dailyCount, setDailyCount] = useState(null);
  const [cigarPrice, setCigarPrice] = useState(null);
  const [cigarsPerPack, setCigarsPerPack] = useState(null);

  // 금연 및 흡연 시작날짜에서 현재 날짜 이후의 날짜는 선택하지 못하도록 하기위해 현재 날짜 받음
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maxDate = getCurrentDate();

  //선택한 날짜를 yyyy-mm-dd형태에서 yyyy년 mm월 dd일로 변환해 저장
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleQuitDate = (e) => {
    setMaxSmokeDate(e.target.value);
    setQuitDate(formatDate(e.target.value));
  };

  const handleSmokeDate = (e) => {
    setMinQuitDate(e.target.value);
    setSmokeDate(formatDate(e.target.value));
  };

  /*   useEffect(() => {
    console.log("currentDate:", maxDate);
    console.log("quitDate : ", quitDate);
    console.log("smokeDate : ", smokeDate);
  }, [quitDate, smokeDate]); */

  useEffect(() => {
    setMaxSmokeDate(maxDate);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-[80%]">
          <div className="text-xl font-semibold mb-10">
            반갑습니다! <br />
            기본 정보를 입력해주세요.
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">금연 시작일시</div>
            <input
              type="date"
              max={maxDate}
              min={minQuitDate}
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
              onChange={handleQuitDate}></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">흡연 시작일시</div>
            <input
              type="date"
              max={maxSmokeDate}
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
              onChange={handleSmokeDate}></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">하루 흡연량(개비)</div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
              value={dailyCount}
              onChange={(e) => setDailyCount(e.target.value)}
              placeholder="하루에 몇 개비를 피우시나요?"></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">담배 가격</div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
              value={cigarPrice}
              placeholder="현재 담배값 평균은 4500원이라고 해요."
              onChange={(e) => setCigarPrice(e.target.value)}></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">
              담배 한 갑당 개비 수
            </div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
              value={cigarsPerPack}
              onChange={(e) => setCigarsPerPack(e.target.value)}
              placeholder="일반적으로 담배 한 갑에는 20개비가 들어있어요."></input>
          </div>

          <button className="w-full h-14 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-6">
            가입하기
          </button>
        </div>
      </div>
    </>
  );
}
