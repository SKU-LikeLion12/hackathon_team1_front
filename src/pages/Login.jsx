import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Header from "../components/Header";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const handleLogin = async () => {
    if (id.length == 0 && pw.length == 0) {
      alert("아이디와 패스워드를 입력해주세요");
    } else {
      try {
        const response = await api().post("/login", {
          userId: id,
          password: pw,
        });

        if (response.status === 200 && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);

          navigate("/main", { replace: true });
        } else {
          alert("유효하지 않은 아이디, 비밀번호입니다.");
        }
      } catch (error) {
        console.error("Login.jsx handleLogin error : ", error);
        alert("오류 발생");
      }
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-2xl font-bold mb-2 text-[#93BF66]">로그인하기</p>
            <p className="font-bold text-[#676767]">
              無연에 오신것을 환영합니다!
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-4 mb-8" />

          <div>
            <div className="text-[#8A8585] text-xs mb-2">아이디</div>
            <input
              type="text"
              value={id}
              onChange={handleId}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>
          </div>

          <div className="mt-6 mb-3">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호</div>
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>
          </div>

          <div className="text-[#8A8585] text-xs mb-16 flex justify-center">
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
            onClick={handleLogin}>
            로그인 하기
          </button>
        </div>
      </div>
    </>
  );
}
