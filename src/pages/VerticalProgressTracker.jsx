import React from "react";
import ProgressStep from "./ProgressStep";

const steps = [
  { time: "20분", status: "completed", text: "심박수가 정상으로 돌아옵니다" },
  {
    time: "8시간",
    status: "completed",
    text: "혈중산소농도가 정상으로 돌아옵니다. 니코틴 레벨이 90%까지 떨어집니다.",
  },
  {
    time: "24시간",
    status: "completed",
    text: "혈압이 떨어지고, 심장병 발병률이 줄어들기 시작합니다.",
  },
  {
    time: "48시간",
    status: "in-progress",
    text: "맛과 냄새를 맡는 능력이 향상됩니다.",
  },
  { time: "72시간", status: "upcoming", text: "몸에서 니코틴이 빠져요." },
  {
    time: "1주",
    status: "upcoming",
    text: "니코틴 욕구가 줄어드는 것이 느껴지기 시작합니다.",
  },
  {
    time: "2주",
    status: "upcoming",
    text: "기침과 숨가쁨이 덜해집니다. 심혈관계가 개선되고, 신체 활동이 조금 더 쉬워집니다.",
  },
  {
    time: "1개월",
    status: "upcoming",
    text: "기침과 숨가쁨이 덜해집니다. 심혈관계가 개선되고, 신체 활동이 조금 더 쉬워집니다.",
  },
];

const VerticalProgressTracker = () => {
  return (
    <div className="flex flex-col items-start">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center mb-5">
          <ProgressStep status={step.status} />
          <div className="ml-5">
            <div className="font-bold text-[15px]">{step.time}</div>
            <div className="text-[10px] mt-1">{step.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalProgressTracker;
