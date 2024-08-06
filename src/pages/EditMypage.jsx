import React, { useState, useEffect } from "react";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { PiUserCircleThin } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function EditMypage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, noSmk, startSmk, amountSmk, price, ciga, tar, image } =
    location.state || {};

  const [userName, setUserName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [quitDate, setQuitDate] = useState(noSmk);
  const [smokeDate, setSmokeDate] = useState(startSmk);
  const [dailyCount, setDailyCount] = useState(amountSmk);
  const [cigarPrice, setCigarPrice] = useState(price);
  const [cigarsPerPack, setCigarsPerPack] = useState(ciga);
  const [tarCount, setTarCount] = useState(tar);

  const [minQuitDate, setMinQuitDate] = useState("");
  const [maxSmokeDate, setMaxSmokeDate] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isEdited, setIsEdited] = useState({
    name: false,
    email: false,
    dailyCount: false,
    cigarPrice: false,
    cigarsPerPack: false,
    tar: false,
    image: false,
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maxDate = getCurrentDate();

  const compressImage = (file, maxWidth, maxHeight, quality) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            quality
          );
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedFile = await compressImage(file, 800, 800, 0.7);
        setSelectedFile(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
        setIsEdited({ ...isEdited, image: true });
      } catch (error) {
        console.error("이미지 압축 중 오류 발생:", error);
      }
    }
  };

  const navigateToMypage = () => {
    navigate("/mypage", { replace: true });
  };

  const isNameValid = (name) => /^[가-힣]{2,10}$/.test(name);
  const isEmailValid = (email) =>
    /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(email);
  const isNumberValid = (value) => /^\d+$/.test(value);

  const handleName = (e) => {
    setUserName(e.target.value);
    setIsEdited({ ...isEdited, name: true });
  };

  const handleEmail = (e) => {
    setEditEmail(e.target.value);
    setIsEdited({ ...isEdited, email: true });
  };

  const handleQuitDate = (e) => {
    setMaxSmokeDate(e.target.value);
    setQuitDate(e.target.value);
  };

  const handleSmokeDate = (e) => {
    setMinQuitDate(e.target.value);
    setSmokeDate(e.target.value);
  };

  const handleDailyCount = (e) => {
    setDailyCount(e.target.value);
    setIsEdited({ ...isEdited, dailyCount: true });
  };

  const handleCigarPrice = (e) => {
    setCigarPrice(e.target.value);
    setIsEdited({ ...isEdited, cigarPrice: true });
  };

  const handleCigarsPerPack = (e) => {
    setCigarsPerPack(e.target.value);
    setIsEdited({ ...isEdited, cigarsPerPack: true });
  };

  const handleTar = (e) => {
    setTarCount(e.target.value);
    setIsEdited({ ...isEdited, tar: true });
  };

  useEffect(() => {
    if (image != null) {
      setImagePreview(`data:image/png;base64,${image}`);
    }
    setMaxSmokeDate(quitDate);
    setMinQuitDate(smokeDate);
  }, []);

  const handleEdit = async () => {
    const isValid =
      (!isEdited.name || isNameValid(userName)) &&
      (!isEdited.email || isEmailValid(editEmail)) &&
      (!isEdited.dailyCount || isNumberValid(dailyCount)) &&
      (!isEdited.cigarPrice || isNumberValid(cigarPrice)) &&
      (!isEdited.cigarsPerPack || isNumberValid(cigarsPerPack)) &&
      (!isEdited.tar || isNumberValid(tarCount));

    if (isValid) {
      const formData = new FormData();

      // 변경된 필드만 새 값으로 추가하고, 그렇지 않은 필드는 원래 값 사용
      formData.append("name", isEdited.name ? userName : name);
      formData.append("email", isEdited.email ? editEmail : email);
      formData.append("noSmk", quitDate);
      formData.append("startSmk", smokeDate);
      formData.append(
        "amountSmk",
        isEdited.dailyCount ? parseInt(dailyCount, 10) : amountSmk
      );
      formData.append(
        "price",
        isEdited.cigarPrice ? parseInt(cigarPrice, 10) : price
      );
      formData.append(
        "ciga",
        isEdited.cigarsPerPack ? parseInt(cigarsPerPack, 10) : ciga
      );
      formData.append("tar", isEdited.tar ? parseInt(tarCount, 10) : tar);

      // 이미지가 변경되었을 때만 새 이미지 추가
      if (isEdited.image && selectedFile) {
        formData.append("image", selectedFile);
      }

      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api().put("/member", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("서버 응답:", response.data);
          navigate("/mypage", { replace: true });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          } else {
            console.error(
              "서버 오류:",
              error.response ? error.response.data : error
            );
            alert(
              "수정 중 오류가 발생했습니다: " +
                (error.response ? error.response.data.message : error.message)
            );
          }
        }
      } else {
        navigate("/", { replace: true });
      }
    } else {
      console.error("변경된 필드의 값이 올바르지 않습니다.");
      alert("입력한 정보를 다시 확인해주세요.");
    }
  };

  return (
    <>
      <div className="p-5">
        <div className="flex items-center">
          <button onClick={navigateToMypage}>
            <RiArrowLeftWideFill size={30} />
          </button>
          <div className="font-bold text-xl">마이페이지</div>
        </div>

        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-7rem)]">
          <div className="w-[85%]">
            <div className="flex flex-col items-center mt-4">
              {imagePreview === null ? (
                <PiUserCircleThin size={90} />
              ) : (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
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
            </div>

            <div className="w-full mt-10">
              <div className="w-full border-[0.5px] mb-5"></div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">이름</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                  <input
                    type="text"
                    value={userName}
                    onChange={handleName}
                    className="text-center"></input>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">이메일</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                  <input
                    type="text"
                    value={editEmail}
                    onChange={handleEmail}
                    className="text-center"></input>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">금연 시작일시</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3 w-full">
                  <input
                    type="date"
                    value={quitDate}
                    max={maxDate}
                    min={minQuitDate}
                    onChange={handleQuitDate}
                    className="text-center w-full"></input>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">흡연 시작일시</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                  <input
                    type="date"
                    value={smokeDate}
                    max={maxSmokeDate}
                    onChange={handleSmokeDate}
                    className="text-center w-full"></input>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">하루 흡연량(개비)</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                  <input
                    type="text"
                    value={dailyCount}
                    onChange={handleDailyCount}
                    className="text-center"></input>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">담배 한 값당 개비수</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                  <input
                    type="text"
                    value={cigarsPerPack}
                    onChange={handleCigarsPerPack}
                    className="text-center"></input>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">담배 한 갑 당 가격</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                  <input
                    type="text"
                    value={cigarPrice}
                    onChange={handleCigarPrice}
                    className="text-center"></input>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 font-bold">타르(담배)</div>
                <div className="flex-1 border-b-[1px] border-[#BABABA] text-center py-3">
                  <input
                    type="text"
                    value={tarCount}
                    onChange={handleTar}
                    className="text-center"></input>
                </div>
              </div>

              <div className="flex justify-center mt-16">
                <button
                  className="border-2 rounded-lg w-[80%] h-14 border-t-0 border-r-0 border-l-0 border-b-0 bg-[#93BF66] text-white font-bold mt-5"
                  onClick={handleEdit}>
                  수정완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
