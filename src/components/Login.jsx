import React from "react";
import Header from "./Header";

export default function Login() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="w-[80%]">
          <div>
            <div className="text-[#8A8585] text-xs mb-2">아이디</div>
            <input
              type="text"
              value="아이디"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>
          </div>

          <div className="mt-4 mb-3">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호</div>
            <input
              type="password"
              value="비밀번호"
              className="w-full h-14 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>
          </div>

          <div className="text-[#8A8585] text-xs mb-6 flex justify-center">
            아이디찾기 | 비밀번호 설정 | 회원가입
          </div>

          <button className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold">
            로그인 하기
          </button>

          <div className="my-20">
            <button className="my-1 w-full h-12 border-[1px] border-[#848484] bg-white rounded-lg font-bold text-sm">
              <div>구글로 로그인하기</div>
            </button>

            <button className="my-1 w-full h-12 border-[1px] border-[#848484] bg-[#FEE500] rounded-lg font-bold text-sm">
              <div>카카오톡으로 로그인하기</div>
            </button>

            <button className="my-1 w-full h-12 border-[1px] border-[#000000] bg-[#000000] rounded-lg font-bold text-sm text-white">
              <div>애플로 로그인하기</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
