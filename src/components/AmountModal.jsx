import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Money from "../animation/Money";
import api from "../api/api";

export default function AmountModal(props) {
  const { AmountModalClose, savedMoney } = props;

  const [dayPrice, setDayPrice] = useState(0);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const response = await api().get("/main/info/money");
        const price = response.data;
        setDayPrice(price);
      } catch (error) {
        console.error("getPrice response error : ", error);
      }
    };

    getPrice();
  }, []);

  const [amountToSave, setAmountToSave] = useState([
    { period: "1주", price: 0 },
    { period: "1개월", price: 0 },
    { period: "1년", price: 0 },
    { period: "5년", price: 0 },
    { period: "10년", price: 0 },
    { period: "20년", price: 0 },
  ]);

  useEffect(() => {
    if (dayPrice > 0) {
      const updatedAmounts = [
        { period: "1주", price: dayPrice * 7 },
        { period: "1개월", price: dayPrice * 30 },
        { period: "1년", price: dayPrice * 365 },
        { period: "5년", price: dayPrice * 365 * 5 },
        { period: "10년", price: dayPrice * 365 * 10 },
        { period: "20년", price: dayPrice * 365 * 20 },
      ];
      setAmountToSave(updatedAmounts);
    }
  }, [dayPrice]);

  const handleModalClose = () => {
    AmountModalClose(false);
    document.body.style.overflow = "unset";
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 max-w-[500px] min-h-screen mx-auto overflow-x-hidden overflow-y-auto bg-[#CDCDCD]/[.3] select-none">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-[75%]">
            <div className="w-full min-h-[530px] bg-white rounded-2xl drop-shadow-xl">
              <div className="w-[80%] min-h-[530px] mx-auto py-10 text-center flex flex-col justify-center items-center">
                <div className="h-40 w-40">
                  <Money />
                </div>

                <div>
                  <p className="text-xl font-bold mb-2">절약한 금액</p>
                  <p className="text-lg font-bold">{savedMoney}원</p>
                </div>

                <div className="w-full h-[140px] rounded-lg bg-[#F3F3F3] text-[13px] font-bold my-10 px-5 py-2 flex flex-col justify-center">
                  {amountToSave.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <p>{item.period}</p>
                      <p>{item.price.toLocaleString() + "원"}</p>
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
