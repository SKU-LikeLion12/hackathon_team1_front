import React from "react";
import Header from "../components/Header";

export default function ResetPasswordAuth() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-2">비밀번호 재설정하기</p>
            <p className="font-bold text-[#676767]">정보를 입력해주세요!</p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-3 mb-8" />

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">이름</div>
            <input
              type="text"
              value="이름"
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">전화번호</div>

            <div className="flex">
              <input
                type="text"
                value="전화번호"
                className="w-3/4 h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 mr-2"
              ></input>

              <button className="w-1/4 h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm">
                인증하기
              </button>
            </div>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">인증번호</div>
            <input
              type="text"
              value="인증번호"
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>
            <div className="text-xs pl-2 font-bold text-[#27AD1C]">
              유효한 인증번호 입니다.
            </div>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">아이디</div>
            <input
              type="text"
              value="아이디"
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>
          </div>

          <button className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-8">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </>
  );
}
