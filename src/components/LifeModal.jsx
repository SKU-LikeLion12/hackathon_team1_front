import React from "react";
import ReactDOM from "react-dom";
import Heart from "../animation/Heart";

export default function LifeModal(props) {
  const { LifeModalClose } = props;

  const amountToSave = [
    { period: "1주", price: "1일 4시간" },
    { period: "1개월", price: "5일 4시간" },
    { period: "1년", price: "2개월 5시간" },
    { period: "5년", price: "11개월 6시간" },
    { period: "10년", price: "1년 6개월 11시간" },
    { period: "20년", price: "3년 2개월 24시간" },
  ];

  const handleModalClose = () => {
    LifeModalClose(false);
    document.body.style.overflow = "unset";
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 max-w-[500px] min-h-screen mx-auto overflow-x-hidden overflow-y-auto bg-[#CDCDCD]/[.3]">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-[75%]">
            <div className="w-full min-h-[530px] bg-white rounded-2xl drop-shadow-xl">
              <div className="w-[80%] min-h-[530px] mx-auto py-10 text-center flex flex-col justify-center items-center">
                <div className="h-32 w-32">
                  <Heart />
                </div>

                <div>
                  <p className="text-xl font-bold mb-2">절약된 수명</p>
                  <p className="text-lg font-bold">22일 21시간 41분</p>
                </div>

                <div className="w-full h-[140px] rounded-lg bg-[#F3F3F3] text-[13px] font-bold my-10 px-5 py-2 flex flex-col justify-center">
                  {amountToSave.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <p>{item.period}</p>
                      <p>{item.price}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleModalClose}
                  className="w-full h-14 bg-[#93BF66] rounded-lg text-white font-bold">
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}
