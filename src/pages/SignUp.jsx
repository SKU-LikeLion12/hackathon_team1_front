import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  //입력값 저장 변수
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState(null);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  //작성 형식이 정규식에 알맞는지 여부
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [authNumValid, setAuthNumValid] = useState(null);
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [checkPwVaild, setCheckPwValid] = useState(false);

  //중복 확인을 진행한 경우
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);

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

  //이메일 중복 확인
  const updateEmailDuplication = async () => {
    try {
      const response = await api().get("/member/email", {
        params: { emailCheck: email },
      });

      if (response.status === 200) {
        const isEmailAvailable = response.data; // 서버에서 반환한 true 또는 false 값

        if (isEmailAvailable === true) {
          // true일 경우 처리
          alert("사용 가능한 이메일입니다.");
          setIsEmailDuplicate(true);
        } else {
          alert("이미 가입된 이메일입니다.");
          setIsEmailDuplicate(false);
        }
      }
    } catch (error) {
      console.error("response error : ", error);
      setIsEmailDuplicate(false);
    }
  };

  const requestAuthNum = async () => {
    //isEmailDuplicate가 true면 인증코드 발송, false면 이메일 중복확인을 진행하라는 알림창 열림
    if (isEmailDuplicate) {
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
        console.error("response error : ", error);
      }
    } else {
      alert("이메일 중복 확인을 진행해주세요!");
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

        alert(isAuthNumAvailable);

        //200 상태 중, 성공 & 실패에 따른 문구 출력을 위함
        if (isAuthNumAvailable === true) {
          setAuthNumValid(true);
        } else if (isAuthNumAvailable === false) {
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

  const handleId = (e) => {
    // 아이디 정규표현식
    const regex = /^[a-zA-Z][0-9a-zA-Z]{5,15}$/g;
    setId(e.target.value);

    if (regex.test(e.target.value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  //아이디 중복 확인
  const updateIdDuplication = async () => {
    if (idValid) {
      try {
        const response = await api().get("/member/id", {
          params: { userId: id },
        });

        if (response.status === 200) {
          const isIdAvailable = response.data; // 서버에서 반환한 true 또는 false 값

          if (isIdAvailable === true) {
            // true일 경우 처리
            alert("사용 가능한 아이디입니다.");
            setIsIdDuplicate(true);
          } else {
            alert("사용 불가능한 아이디입니다.");
            setIsIdDuplicate(false);
          }
        }
      } catch (error) {
        console.error("response error : ", error);
        setIsIdDuplicate(false);
      }
    } else {
      alert("올바른 형식의 아이디를 작성해주세요.");
      setIsIdDuplicate(false);
    }
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
    if (
      nameValid &&
      emailValid &&
      isEmailDuplicate &&
      authNumValid &&
      idValid &&
      isIdDuplicate &&
      pwValid &&
      checkPwVaild
    ) {
      // BasicInfo.jsx에 데이터 전달
      navigate("/info", {
        state: {
          name: name,
          email: email,
          id: id,
          pw: pw,
        },
        replace: true, // 뒤로가기 비활성화
      });
    } else {
      alert("올바른 값이 입력되지 않았거나, 중복 확인이 진행되지 않았습니다.");
    }
  };

  useEffect(() => {
    //pw와 checkPw가 일치하는지 안하는지 값이 업데이트 될 때마다 확인
    if (checkPw === pw) {
      setCheckPwValid(true);
    } else {
      setCheckPwValid(false);
    }
  }, [pw, checkPw]);

  useEffect(() => {
    //중복확인을 마친 이후 시점에, email이 변경되면 다시 중복확인 진행하도록
    setIsEmailDuplicate(false);
    setIsIdDuplicate(false);
    setAuthNumValid(null);
  }, [email, id, authNum]);

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="w-[80%] mt-8 mb-14">
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

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!nameValid && name.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                한글 2~10자 형식으로 작성해주세요.
              </div>
            )}
          </div>

          <div className="mb-3">
            <div className="text-[#8A8585] text-xs mb-2">이메일</div>
            <div className="flex">
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5"></input>

              <button
                className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm mx-2"
                onClick={updateEmailDuplication}>
                중복확인
              </button>

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

            {isEmailDuplicate && (
              <div className="text-xs pl-2 font-bold text-[#27AD1C]">
                사용 가능한 이메일입니다.
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

            <div className="text-xs pl-2 font-bold text-[#27AD1C]"></div>
          </div>

          <div className="mb-3">
            <div className="text-[#8A8585] text-xs mb-2">아이디</div>

            <div className="flex">
              <input
                type="text"
                value={id}
                onChange={handleId}
                className="w-full h-12 border-[1px] border-[#BABABA] bg-[#F9FAFC] rounded-lg px-5 mr-2"></input>

              <button
                className="min-w-[75px] h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold text-sm"
                onClick={updateIdDuplication}>
                중복확인
              </button>
            </div>

            {/* 정규표현식에 부합하는지 알려주는 문구 */}
            {!idValid && id.length > 0 && (
              <div className="text-xs pl-2 font-bold text-[#F92D2D]">
                영문, 숫자 포함 6~16자 입력해주세요.
              </div>
            )}

            {isIdDuplicate && (
              <div className="text-xs pl-2 font-bold text-[#27AD1C]">
                중복되지 않은 아이디입니다.
              </div>
            )}
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
            onClick={handleButton}
            className="w-full h-12 border-[1px] border-[#93BF66] bg-[#93BF66] rounded-lg text-white font-bold mt-4">
            다음
          </button>
        </div>
      </div>
    </>
  );
}
