import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function ResetPassword() {
  const [pw, setPw] = useState("");
  const [pwValid, setPwValid] = useState(false);
  const [checkPw, setCheckPw] = useState("");
  const [checkPwVaild, setCheckPwValid] = useState(false);

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

  useEffect(() => {
    //pw와 checkPw가 일치하는지 안하는지 값이 업데이트 될 때마다 확인
    if (checkPw === pw) {
      setCheckPwValid(true);
    } else {
      setCheckPwValid(false);
    }
  }, [pw, checkPw]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-2">비밀번호 재설정하기</p>
            <p className="font-bold text-[#676767]">
              재설정할 비밀번호를 작성해주세요!
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#BABABA] mt-3 mb-9" />

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">비밀번호</div>
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>

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
              className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"
            ></input>

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

          <button className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-8">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </>
  );
}
