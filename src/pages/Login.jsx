import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const handleLoginBtn = () => {
    if (id.length == 0 && pw.length == 0) {
      alert("아이디와 패스워드를 입력해주세요");
    } else {
      alert("올바른 입력");
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-[calc(100vh-7rem)]">
        <div className="w-[80%]">
          <div>
            <div className="text-[#8A8585] text-xs mb-2">아이디</div>
            <input
              type="text"
              value={id}
              onChange={handleId}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>
          </div>

          <div className="mt-4 mb-3">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호</div>
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>
          </div>

          <div className="text-[#8A8585] text-xs mb-8 flex justify-center">
            <Link to="/findid">
              <div>아이디찾기</div>
            </Link>

            <span className="mx-1">ㅣ</span>

            <Link to="/resetauth">
              <div>비밀번호 재설정</div>
            </Link>

            <span className="mx-1">ㅣ</span>

            <Link to="/signup">
              <div>회원가입</div>
            </Link>
          </div>

          <button
            className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold"
            onClick={handleLoginBtn}>
            로그인 하기
          </button>

          <div className="mt-20">
            <button className="my-1 w-full h-12 border-[1px] border-[#848484] bg-white rounded-lg font-bold text-sm flex items-center">
              <img src="image/Google_Logo.png" className="w-7 h-7 ml-7" />
              <div className="flex-1">구글로 로그인하기</div>
            </button>

            <button className="my-2 w-full h-12 border-[1px] border-[#848484] bg-[#FEE500] rounded-lg font-bold text-sm flex items-center">
              <img
                src="image/KakaoTalk_Logo.png"
                className="w-6 h-6 ml-[30px]"
              />
              <div className="flex-1">카카오톡으로 로그인하기</div>
            </button>

            <button className="my-1 w-full h-12 border-[1px] border-[#000000] bg-[#000000] rounded-lg font-bold text-sm text-white flex items-center">
              <img src="image/Apple_Logo.png" className="w-7 h-7 ml-7" />
              <div className="flex-1">애플로 로그인하기</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
