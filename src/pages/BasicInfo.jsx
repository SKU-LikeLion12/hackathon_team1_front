import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function BasicInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, id, pw } = location.state || {};

  const [quitDate, setQuitDate] = useState("");
  const [smokeDate, setSmokeDate] = useState("");
  const [minQuitDate, setMinQuitDate] = useState("");
  const [maxSmokeDate, setMaxSmokeDate] = useState("");
  //정수형 변환 필요
  const [dailyCount, setDailyCount] = useState("");
  const [cigarPrice, setCigarPrice] = useState("");
  const [cigarsPerPack, setCigarsPerPack] = useState("");

  const [dailyCountValid, setDailyCountValid] = useState(false);
  const [cigarPriceValid, setCigarPriceValid] = useState(false);
  const [cigarsPerPackValid, setCigarsPerPackValid] = useState(false);

  // 금연 및 흡연 시작날짜에서 현재 날짜 이후의 날짜는 선택하지 못하도록 하기위해 현재 날짜 받음
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maxDate = getCurrentDate();

  const handleQuitDate = (e) => {
    setMaxSmokeDate(e.target.value);
    setQuitDate(e.target.value);
  };

  const handleSmokeDate = (e) => {
    setMinQuitDate(e.target.value);
    setSmokeDate(e.target.value);
  };

  const handleDailyCount = (e) => {
    //숫자만 입력 가능한 정규표현식
    const regex = /^\d+$/;
    setDailyCount(e.target.value);

    if (regex.test(e.target.value)) {
      setDailyCountValid(true);
    } else {
      setDailyCountValid(false);
    }
  };

  const handleCigarPrice = (e) => {
    const regex = /^\d+$/;
    setCigarPrice(e.target.value);

    if (regex.test(e.target.value)) {
      setCigarPriceValid(true);
    } else {
      setCigarPriceValid(false);
    }
  };

  const handleCigarsPerPack = (e) => {
    const regex = /^\d+$/;
    setCigarsPerPack(e.target.value);

    if (regex.test(e.target.value)) {
      setCigarsPerPackValid(true);
    } else {
      setCigarsPerPackValid(false);
    }
  };

  //가입하기 버튼 클릭
  const handleSignUp = async () => {
    //모든값이 유효한 경우 가입 가능

    if (
      quitDate &&
      smokeDate &&
      dailyCountValid &&
      cigarPriceValid &&
      cigarsPerPackValid
    ) {
      const amountSmk = parseInt(dailyCount, 10);
      const price = parseInt(cigarPrice, 10);
      const ciga = parseInt(cigarsPerPack, 10);

      const data = {
        name: name,
        userId: id,
        password: pw,
        email: email,
        noSmk: quitDate,
        startSmk: smokeDate,
        amountSmk: amountSmk,
        price: price,
        ciga: ciga,
        tar: 4,
      };

      try {
        const response = await api().post("/url", data);

        if (response.status === 200 && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);

          navigate("/", { replace: true });
        } else {
          alert("회원가입에 실패했습니다.");
          navigate("/signup", { replace: true });
        }
      } catch (error) {
        console.error("handleSignUp response error : ", error);
      }
    } else {
      alert("올바른 값을 입력해주세요.");
    }
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
              onChange={handleDailyCount}
              placeholder="하루에 몇 개비를 피우시나요?"></input>

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!dailyCountValid && dailyCount.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                숫자만 입력해주세요.
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">담배 가격</div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
              value={cigarPrice}
              placeholder="현재 담배값 평균은 4500원이라고 해요"
              onChange={handleCigarPrice}></input>

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!cigarPriceValid && cigarPrice.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                숫자만 입력해주세요.
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">
              담배 한 갑당 개비 수
            </div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
              value={cigarsPerPack}
              onChange={handleCigarsPerPack}
              placeholder="담배 한 갑에는 보통 20개비가 들어있어요"></input>

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!cigarsPerPackValid && cigarsPerPack.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                숫자만 입력해주세요.
              </div>
            )}
          </div>

          <button
            className="w-full h-14 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-6"
            onClick={handleSignUp}>
            가입하기
          </button>
        </div>
      </div>
    </>
  );
}
