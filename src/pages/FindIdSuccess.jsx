import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";

export default function FindIdSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, id } = location.state || {};

  const navigateToLogin = () => {
    navigate("/", { replace: true });
  };

  const navigateToResetPw = () => {
    navigate("/resetauth", { replace: true });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-2 text-[#93BF66]">아이디 찾기</p>
            <p className="font-bold text-[#676767]">
              입력하신 정보에 따른 아이디 찾기 결과입니다!
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-3 mb-16" />

          <div className="w-5/6 mx-auto font-bold text-xl">
            <p className="mb-10 text-left">
              <span className="text-[#93BF66] text-2xl">{name}</span> 님의
              아이디는
            </p>
            <p className="text-right">
              <span className="text-[#93BF66] text-2xl">
                &quot; {id} &quot;
              </span>{" "}
              입니다
            </p>
          </div>

          <button
            className="w-full h-12 bg-[#93BF66] rounded-lg text-white font-bold mt-16 flex justify-center items-center"
            onClick={navigateToLogin}>
            로그인 하러 가기
          </button>

          <div className="mt-3 mr-2 text-right font-bold text-xs text-[#676767]">
            <span className="mr-2">비밀번호가 기억나지 않는다면?</span>
            <button className="underline" onClick={navigateToResetPw}>
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
