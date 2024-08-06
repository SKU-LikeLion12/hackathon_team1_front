import React, { useEffect, useState } from "react";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { PiUserCircleThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Mypage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [startDay, setStartDay] = useState(null);

  const [myData, setMyData] = useState({
    name: "",
    email: "",
    noSmk: "",
    startSmk: "",
    amountSmk: 0,
    price: 0,
    ciga: 0,
    tar: 0,
    image: null,
  });

  const navigateToEditMypage = () => {
    navigate("/editmypage", {
      state: {
        name: myData.name,
        email: myData.email,
        noSmk: myData.noSmk,
        startSmk: myData.startSmk,
        amountSmk: myData.amountSmk,
        price: myData.price,
        ciga: myData.ciga,
        tar: myData.tar,
        image: myData.image,
      },
    });
  };

  const navigateToMain = () => {
    navigate("/main");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await api().get("/member/detail");
          const data = response.data;

          console.log(data);

          setMyData({
            name: data.name,
            email: data.email,
            noSmk: data.noSmk,
            startSmk: data.startSmk,
            amountSmk: data.amountSmk,
            price: data.price,
            ciga: data.ciga,
            tar: data.tar,
            image: data.image,
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          } else {
            console.error("loadInitialData error: ", error);
          }
        }
      }
    };

    fetchData(); // fetchData 함수 호출
  }, [navigate]); // navigate를 의존성 배열에 추가

  return (
    <>
      {/* top */}
      <div className="p-5">
        <div className="flex items-center">
          <button onClick={navigateToMain}>
            <RiArrowLeftWideFill size={30} />
          </button>
          <div className="font-bold text-xl">마이페이지</div>
        </div>

        <div className="flex flex-col items-center mx-auto mt-7">
          {myData.image === null ? (
            <PiUserCircleThin size={90} />
          ) : (
            <img
              src={`data:image/png;base64,${myData.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          )}
        </div>

        <div className="flex flex-col justify-center items-center mt-10">
          <div className="w-[85%]">
            <div className="w-full border-[0.5px] mb-5"></div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">이름</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.name}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">이메일</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.email}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">금연 시작일시</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.noSmk}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">흡연 시작일시</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.startSmk}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">하루 흡연량(개비)</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.amountSmk}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">담배 한 값당 개비수</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.ciga}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">담배 한 갑 당 가격</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.price}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 font-bold">타르(담배)</div>
              <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                {myData.tar}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-[#8D8D8D] underline text-sm mt-5 float-right">
              로그아웃
            </button>

            <div className="flex justify-center mt-16">
              <button
                className="border-2 rounded-lg w-[80%] h-14 border-t-0 border-r-0 border-l-0 border-b-0 bg-[#93BF66] text-white font-bold mt-5"
                onClick={navigateToEditMypage}>
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
