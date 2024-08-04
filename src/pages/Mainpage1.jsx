import React from "react";
import ProgressBar from "./ProgressBar.jsx"; // Import the ProgressBar component
import Circle from "./Circle";
import { FaCheckCircle } from "react-icons/fa";

export default function Mainpage1() {
  const boxData = [
    {
      time: "20분",
      text: "심박수가 정상으로 돌아옵니다",
      progress: 30,
      status: "in-progress",
    },
    {
      time: "8시간",
      text: "혈중산소농도가 정상으로 돌아옵니다. 니코틴 레벨이 90%까지 떨어집니다.",
      progress: 50,
      status: "upcoming",
    },
    {
      time: "24시간",
      text: "혈압이 떨어지고, 심장병 발병률이 줄어들기 시작합니다.",
      progress: 70,
      status: "upcoming",
    },
    {
      time: "48시간",
      text: "맛과 냄새를 맡는 능력이 향상됩니다.",
      progress: 90,
      status: "upcoming",
    },
    {
      time: "72시간",
      text: "몸에서 니코틴이 빠져요.",
      progress: 100,
      status: "upcoming",
    },
    {
      time: "1주",
      text: "니코틴 욕구가 줄어드는 것이 느껴지기 시작합니다.",
      progress: 60,
      status: "upcoming",
    },
    {
      time: "2주",
      text: "기침과 숨가쁨이 덜해집니다. 심혈관계가 개선되고, 신체 활동이 조금 더 쉬워집니다.",
      progress: 80,
      status: "upcoming",
    },
    {
      time: "1개월",
      text: "그냥 좀 끊어라",
      progress: 100,
      status: "upcoming",
    },
  ];

  return (
    <div className="bg-white border-2 min-h-full flex flex-col items-center justify-start">
      <div>여기에 로고 들어갈거임</div>
      <div className="w-full h-[1px] bg-slate-400 "></div>
      <div className=" flex bg-white w-full h-[60px] justify-start ml-[40px]">
        금연한지 <div className="font-bold">00시간</div>
        <div className=" justify-start ">지났습니다~!</div>{" "}
      </div>

      <div className="fixed top-20 w-[1px] h-full border-2 border-green-700 mr-[350px]"></div>
      <div className="flex flex-col items-center  space-y-5 ml-[80px] ">
        {boxData.map((box, index) => (
          <div
            key={index}
            className="box border w-[300px] bg-[#F5F2EB] rounded-xl p-4  flex-col relative">
            <div className="absolute -left-[50px] top-1/3 ">
              <Circle status={box.status} />
            </div>
            <div className="font-bold text-[15px]">{box.time}</div>
            <div className="text-[10px] mt-1">{box.text}</div>
            <ProgressBar progress={box.progress} />
          </div>
        ))}
      </div>
    </div>
  );
}
