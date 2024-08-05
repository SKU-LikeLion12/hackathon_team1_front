import React from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import { CheckIcon, DotsIcon } from "../animation/icons/MainPageIcons";
import { useLocation } from "react-router-dom";

const timelineData = [
  { time: 20, description: "심박수가 정상으로 돌아옵니다." }, // 20분
  {
    time: 480,
    description:
      "혈중산소도가 정상으로 돌아옵니다. 니코틴 레벨이 90%까지 떨어집니다.",
  }, // 8시간
  {
    time: 1440,
    description: "혈압이 떨어지고, 심장 발작의 위험이 줄어들기 시작합니다.",
  }, // 24시간
  { time: 2880, description: "맛과 냄새를 맡는 능력이 향상됩니다." }, // 48시간
  {
    time: 4320,
    description: "몸에서 니코틴이 모두 빠져나옵니다. 숨쉬기 편해집니다.",
  }, // 72시간
  {
    time: 14400,
    description: "일반적인 경우 니코틴 유혹이 줄어드는 것을 느끼기 시작합니다.",
  }, // 10일
  {
    time: 129600,
    description:
      "기관지가 개방됩니다. 혈액순환이 개선되고, 신체 활동이 더 쉬워집니다.",
  }, // 3개월
  {
    time: 273600,
    description:
      "기침과 호흡, 축농증이 감소됩니다. 호흡기 감염 위험이 크게 감소합니다.",
  }, // 9개월
  {
    time: 525600,
    description: "심장병의 위험이 절반에 절감되고 간암을 막습니다.",
  }, // 1년
  {
    time: 2628000,
    description:
      "뇌졸중 위험이 크게 감소하였습니다. 동맥과 혈관이 다시 넓어지기 시작한 것으로 흡연 전 상태로 치유되었습니다.",
  }, // 5년
];

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

  return result.join(" ");
};

export default function MainpageStatus() {
  const location = useLocation();
  const { daysSinceQuit } = location.state || {};

  return (
    <>
      <div>
        <Header />

        <div className="max-w-lg mx-auto px-6 py-8 select-none">
          <div className="text-2xl mb-6">
            금연한지{" "}
            <span className="font-bold">{formatTime(daysSinceQuit)}</span>{" "}
            <br />
            경과하였습니다.
          </div>
          <div className="relative">
            {timelineData.map((item, index) => {
              const percentage = Math.min(
                (daysSinceQuit / item.time) * 100,
                100
              );
              return (
                <div key={index} className="mb-8 relative flex items-center">
                  <div className="mr-6">
                    {percentage >= 100 ? (
                      <CheckIcon /> // 체크표시
                    ) : (
                      <DotsIcon /> // 진행 중 표시
                    )}
                  </div>

                  <div className="w-full flex flex-col bg-[#F5F2EB] rounded-lg px-5 py-4">
                    <div className="text-sm font-bold mb-2">
                      {formatTime(item.time)}
                    </div>
                    <div className="text-[#4A4A4A] text-sm mb-2">
                      {item.description}
                    </div>
                    <ProgressBar percentage={percentage} />
                    <div className="text-xs text-[#656565] text-right">
                      {Math.round(percentage)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
