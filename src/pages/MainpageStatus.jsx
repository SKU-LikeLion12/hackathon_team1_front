import React from "react";
import Header from "../components/Header";

const timelineData = [
  { time: "20분", description: "심박수가 정상으로 돌아옵니다." },
  {
    time: "8시간",
    description:
      "혈중산소도가 정상으로 돌아옵니다. 니코틴 레벨이 90%까지 떨어집니다.",
  },
  {
    time: "24시간",
    description: "혈압이 떨어지고, 심장 발작의 위험이 줄어들기 시작합니다.",
  },
  { time: "48시간", description: "맞과 냄새를 맡는 능력이 향상됩니다." },
  {
    time: "72시간",
    description: "몸에서 니코틴이 모두 빠져나옵니다. 숨쉬기 편해집니다.",
  },
  {
    time: "10일",
    description: "일반적인 경우 니코틴 유혹이 줄어드는 것을 느끼기 시작합니다.",
  },
  {
    time: "3개월",
    description:
      "기관지가 개방됩니다. 혈액순환이 개선되고, 신체 활동이 더 쉬워집니다.",
  },
  {
    time: "9개월",
    description:
      "기침과 호흡, 축농증이 감소됩니다. 호흡기 감염 위험이 크게 감소합니다.",
  },
  {
    time: "1년",
    description: "심장병의 위험이 절반에 절감되고 간암을 막습니다.",
  },
  {
    time: "5년",
    description:
      "뇌졸중 위험이 크게 감소하였습니다. 동맥과 혈관이 다시 넓어지기 시작한 것으로 흡연 전 상태로 치유되었습니다.",
  },
];

export default function MainpageStatus() {
  return (
    <>
      <div>
        <Header />

        <div className="max-w-lg mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">
            금연한지 24시간 경과하였습니다.
          </h1>
          <div className="relative">
            <div className="border-l-2 border-gray-300 absolute h-full left-5"></div>
            {timelineData.map((item, index) => (
              <div key={index} className="mb-8 pl-10 relative">
                <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5"></div>
                <div className="text-sm">{item.time}</div>
                <div className="text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
