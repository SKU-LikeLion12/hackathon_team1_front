import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function FindIdSuccess() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-2">아이디 찾기</p>
            <p className="font-bold text-[#676767]">
              입력하신 정보에 따른 아이디 찾기 결과입니다!
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-3 mb-16" />

          <div className="w-5/6 mx-auto font-bold text-xl">
            <p className="mb-10 text-left">
              <span className="text-[#93BF66] text-2xl">이름들어감</span> 님의
              아이디는
            </p>
            <p className="text-right">
              <span className="text-[#93BF66] text-2xl">
                &quot; Aaa0000 &quot;
              </span>{" "}
              입니다
            </p>
          </div>

          <Link to="/login">
            <div className="w-full h-12 bg-[#93BF66] rounded-lg text-white font-bold mt-16 flex justify-center items-center">
              로그인 하러 가기
            </div>
          </Link>

          <div className="mt-3 mr-2 text-right font-bold text-xs text-[#676767]">
            <span className="mr-2">비밀번호가 기억나지 않는다면?</span>
            <Link to="/resetauth">
              <span className="underline">비밀번호 재설정</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
