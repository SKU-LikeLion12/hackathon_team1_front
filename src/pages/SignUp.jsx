import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState(null);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  //const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [checkPwVaild, setCheckPwValid] = useState(false);
  const [buttonAllow, setButtonAllow] = useState(true);

  const handleName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
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

  const handlePw = (e) => {
    // 비밀번호 정규표현식
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    setPw(e.target.value);

    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleCheckPw = (e) => {
    setCheckPw(e.target.value);
  };

  const handleButton = () => {
    alert("버튼 클릭!");
  };

  useEffect(() => {
    //pw와 checkPw가 일치하는지 안하는지 값이 업데이트 될 때마다 확인
    if (checkPw === pw) {
      setCheckPwValid(true);
    } else {
      setCheckPwValid(false);
    }
  }, [pw, checkPw]);

  //제대로된 값이 입력되지 않은 경우 버튼 비활성화
  useEffect(() => {
    if (pwValid && checkPwVaild && emailValid) {
      setButtonAllow(false);
    } else {
      setButtonAllow(true);
    }
  }, [pwValid, checkPwVaild, emailValid]);

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="w-[80%] mt-10 mb-14">
          <div className="text-xl font-semibold mb-10">
            처음이시군요! <br />
            無연에 오신걸 환영해요.
          </div>

          <div className="mb-3">
            <div className="text-[#8A8585] text-xs mb-2">이름</div>
            <input
              type="text"
              value={name}
              onChange={handleName}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>
          </div>

          <div className="mb-3">
            <div className="text-[#8A8585] text-xs mb-2">이메일</div>
            <div className="flex">
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>

              <button className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm mx-2">
                중복확인
              </button>

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

          <div className="mb-3">
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

          <div className="mb-3">
            <div className="text-[#8A8585] text-xs mb-2">아이디</div>

            <div className="flex">
              <input
                type="text"
                value={id}
                onChange={handleId}
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 mr-2"></input>
              <button className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm">
                중복확인
              </button>
            </div>
            <div className="text-xs pl-2 font-bold text-[#27AD1C]">
              사용 가능한 아이디입니다.
            </div>
          </div>

          <div className="mb-3">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호</div>
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!pwValid && pw.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                영문, 숫자, 특수문자 포함 8~16자 입력해주세요.
              </div>
            )}

            {pwValid && (
              <div className="text-xs pl-2 font-bold text-[#27AD1C]">
                올바른 형식의 비밀번호입니다.
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호 확인</div>
            <input
              type="password"
              value={checkPw}
              onChange={handleCheckPw}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>

            {/* 비밀번호와 비밀번호 확인 내용이 부합하는지 알려주는 문구 */}
            {!checkPwVaild && checkPw.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                비밀번호가 일치하지 않습니다.
              </div>
            )}

            {checkPwVaild && checkPw.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#27AD1C]">
                비밀번호가 일치합니다.
              </div>
            )}
          </div>

          <button
            disabled={buttonAllow}
            onClick={handleButton}
            className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-4">
            다음
          </button>
        </div>
      </div>
    </>
  );
}
