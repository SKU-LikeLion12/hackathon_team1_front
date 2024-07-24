import React from "react";
import Header from "../components/Header";

export default function ResetPassword() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-2">비밀번호 재설정하기</p>
            <p className="font-bold text-[#676767]">
              재설정할 비밀번호를 작성해주세요!
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-3 mb-9" />

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호</div>
            <input
              type="password"
              value="비밀번호"
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>
            <div className="text-xs pl-2 font-bold text-[#27AD1C]">
              올바른 형식의 비밀번호입니다.
            </div>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호 확인</div>
            <input
              type="password"
              value="비밀번호 확인"
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>
            <div className="text-xs pl-2 font-bold text-[#F92D2D]">
              비밀번호가 일치하지 않습니다.
            </div>
          </div>

          <button className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-8">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </>
  );
}
