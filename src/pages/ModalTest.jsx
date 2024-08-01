import React, { useState } from "react";
import AmountModal from "../components/AmountModal";
import LifeModal from "../components/LifeModal";

export default function ModalTest() {
  const [AmountModalOpen, setAmountModalOpen] = useState(false);
  const [LifeModalOpen, setLifeModalOpen] = useState(false);

  const handleAmountModal = () => {
    setAmountModalOpen(true);

    //모달창이 떠있을 때는 모달창 아래 부분 스크롤 못하도록
    document.body.style.overflow = "hidden";
  };

  const handleLifeModal = () => {
    setLifeModalOpen(true);

    //모달창이 떠있을 때는 모달창 아래 부분 스크롤 못하도록
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div>
        <button
          className="border-2  bg-[#F9F1F1] w-52 h-14 m-16"
          onClick={handleAmountModal}>
          AmountModalTest
        </button>

        <button
          className="border-2  bg-[#F9F1F1] w-52 h-14 m-16"
          onClick={handleLifeModal}>
          LifeModalTest
        </button>

        {AmountModalOpen && (
          <AmountModal AmountModalClose={setAmountModalOpen} />
        )}

        {LifeModalOpen && <LifeModal LifeModalClose={setLifeModalOpen} />}
      </div>
    </>
  );
}
