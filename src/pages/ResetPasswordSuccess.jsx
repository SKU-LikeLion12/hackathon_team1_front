import React from "react";
import Header from "../components/Header";

export default function ResetPasswordSuccess() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-6">비밀번호 재설정하기</p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-3 mb-16" />

          <div className="w-5/6 mx-auto font-bold text-xl mb-16 text-center">
            비밀번호 재설정 완료!
          </div>

          <button className="w-full h-12 bg-[#93BF66] rounded-lg text-white font-bold">
            로그인 하러 가기
          </button>
        </div>
      </div>
    </>
  );
}
