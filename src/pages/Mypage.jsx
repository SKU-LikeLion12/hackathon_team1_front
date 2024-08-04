import React, { useState } from "react";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { PiUserCircleThin } from "react-icons/pi";

export default function Mypage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [startDay, setStartDay] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      {/* top */}
      <div className="p-5">
        <div className="flex items-center">
          <RiArrowLeftWideFill size={30} />
          <div className="font-bold text-[25px]">마이페이지</div>
        </div>

        <div className="flex flex-col items-center mx-auto mt-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <PiUserCircleThin size={90} />
          )}
          <label
            htmlFor="file-upload"
            className="text-sky-600 text-sm mt-2 cursor-pointer">
            사진수정
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="w-full border-[0.5px] mt-6"></div>
        </div>

        {/* input fields */}
        <div className="grid grid-rows-8 grid-cols-1">
          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>이름</div>
            <input
              type="text"
              className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center"
            />
          </div>

          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>금연 시작 일시</div>
            <div>
              <input
                type="date"
                className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center w-[176px]"
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>흡연 시작 일시</div>
            <input
              type="date"
              className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center w-[176px]"
            />
          </div>

          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>하루 흡연량(개비)</div>
            <input className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center" />
          </div>

          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>담배 가격</div>
            <input className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center" />
          </div>

          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>담배 한 갑당 개비 수</div>
            <input className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center" />
          </div>

          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>전화번호</div>
            <input className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center" />
          </div>

          <div className="flex justify-between mt-5 ml-5 mb-5">
            <div>타르(담배)</div>
            <input className="mr-5 border-2 border-t-0 border-r-0 border-l-0 text-center" />
          </div>

          <div className="w-full border-[0.5px] mt-6"></div>
        </div>

        <div className="flex justify-center">
          <button className="border-2 rounded-lg w-[80%] h-14 border-t-0 border-r-0 border-l-0 border-b-0 bg-[#93BF66] text-white font-bold mt-5">
            수정완료
          </button>
        </div>
      </div>
    </>
  );
}
