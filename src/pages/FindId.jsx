import React, { useEffect, useState } from "react";
import api from "../api/api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function FindId() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState(null);

  //정규식 부합 여부
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [authNumValid, setAuthNumValid] = useState(null);

  const handleName = (e) => {
    const regex = /^[가-힣]{2,10}$/;
    setName(e.target.value);

    if (regex.test(e.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
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

  const requestAuthNum = async () => {
    //emailValid가 true면 인증코드 발송, false면 이메일 형식 올바르지 않음
    if (emailValid) {
      try {
        const response = await api().post("/mailSend", {
          email: email,
        });

        if (response.status === 200) {
          alert("이메일로 인증번호를 보냈습니다.");
        } else {
          console.error("requestAuthNum response is not 200 : ", response);
        }
      } catch (error) {
        console.error("requestAuthNum response error : ", error);
      }
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };

  const handleAuthNum = (e) => {
    setAuthNum(e.target.value);
  };

  //인증번호 유효 확인
  const validateAuthNum = async () => {
    const data = { email: email, userNumber: authNum };

    try {
      const response = await api().get("/mailCheck", { params: data });

      if (response.status === 200) {
        const isAuthNumAvailable = response.data;

        //200 상태 중, 성공 & 실패에 따른 문구 출력을 위함
        if (isAuthNumAvailable === "인증이 성공했습니다.") {
          setAuthNumValid(true);
        } else if (isAuthNumAvailable === "인증이 실패했습니다.") {
          setAuthNumValid(false);
        }
      } else {
        console.log("validateAuthNum response is not 200 : ", response);
        setAuthNumValid(false);
      }
    } catch (error) {
      console.error("response error : ", error);
      setAuthNumValid(false);
    }
  };

  const handleFindId = async () => {
    if (nameValid && emailValid && authNumValid) {
      const data = { name: name, email: email };

      try {
        const response = await api().post("/member/idFind", data);

        if (response.status === 200) {
          const userId = response.data;

          //어떻게 값이 들어오는지 테스트
          console.log(userId);

          navigate("/findsuccess", {
            state: {
              name: name,
              id: userId,
            },
            replace: true, // 뒤로가기 비활성화
          });
        } else {
          console.log(
            "validateAuthNum response is not 200 : ",
            response.status,
            response.data
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("가입되지 않은 이메일입니다.");
          navigate("/", { replace: true });
        } else {
          console.error("response error : ", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요."); // 추가적인 오류 처리
        }
      }
    } else {
      alert("올바른 형식으로 입력해주세요.");
    }
  };

  useEffect(() => {
    setAuthNumValid(null);
  }, [email]);

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="w-[80%]">
          <div>
            <p className="text-xl font-bold mb-2 text-[#93BF66]">아이디 찾기</p>
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

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!nameValid && name.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                한글 2~10자 형식으로 작성해주세요.
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-[#8A8585] text-xs mb-2">이메일</div>

            <div className="flex">
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 mr-2"></input>

              <button
                className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm"
                onClick={requestAuthNum}>
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
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 mr-2"></input>

              <button
                className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm"
                onClick={validateAuthNum}>
                확인
              </button>
            </div>

            {/* 인증번호가 유효한지 알려주는 문구 */}
            {authNumValid && (
              <div className="text-xs pl-2 font-bold text-[#27AD1C]">
                유효한 인증번호입니다.
              </div>
            )}

            {authNumValid === false && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                유효하지 않은 인증번호입니다.
              </div>
            )}
          </div>

          <button
            className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-8"
            onClick={handleFindId}>
            아이디 찾기
          </button>
        </div>
      </div>
    </>
  );
}
