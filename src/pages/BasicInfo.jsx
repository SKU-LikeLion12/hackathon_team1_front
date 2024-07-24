import React from "react";

export default function BasicInfo() {
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
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
            ></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">흡연 시작일시</div>
            <input
              type="date"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
            ></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">하루 흡연량(개비)</div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
            ></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">담배 가격</div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
            ></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">
              담배 한 갑당 개비 수
            </div>
            <input
              type="text"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 text-center"
            ></input>
          </div>

          <button className="w-full h-14 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-6">
            가입하기
          </button>
        </div>
      </div>
    </>
  );
}
