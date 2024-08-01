import React, { useState } from "react";
import Header from "../components/Header";

export default function ResetPasswordAuth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState(null);
  const [id, setId] = useState("");

  const [emailValid, setEmailValid] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    const regex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    setEmail(e.target.value);

    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleAuthNum = (e) => {
    setAuthNum(e.target.value);
  };

  const handleId = (e) => {
    setId(e.target.value);
  };

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
              value={name}
              onChange={handleName}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">이메일</div>

            <div className="flex">
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 mr-2"></input>

              <button className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm">
                인증하기
              </button>
            </div>

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!emailValid && email.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                이메일 형식이 아닙니다.
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">인증번호</div>

            <div className="flex">
              <input
                type="text"
                value={authNum}
                onChange={handleAuthNum}
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>

              <button className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm mx-2">
                재전송
              </button>

              <button className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm">
                확인
              </button>
            </div>

            <div className="text-xs pl-2 font-bold text-[#27AD1C]">
              유효한 인증번호 입니다.
            </div>
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">아이디</div>
            <input
              type="text"
              value={id}
              onChange={handleId}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>
          </div>

          <button className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-8">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </>
  );
}
