import React from "react";
import Header from "../components/Header";

export default function () {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-2">아이디 찾기</p>
            <p className="font-bold text-[#676767]">
              입력하신 정보에 따른 아이디 찾기 결과입니다!
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-3 mb-16" />

          <div className="font-bold text-xl text-center">
            <p className="leading-[50px]">
              <span className="text-[#93BF66] text-2xl">이름들어감</span> 님의
              아이디에 대한 <br />
              정보가 존재하지 않습니다.
            </p>
          </div>

          <button className="w-full h-12 bg-[#93BF66] rounded-lg text-white font-bold mt-16">
            회원가입 하러 가기
          </button>

          <button className="w-full h-12 bg-[#93BF66] rounded-lg text-white font-bold mt-6">
            아이디 다시 찾기
          </button>
        </div>
      </div>
    </>
  );
}
