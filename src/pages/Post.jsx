import React, { useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/api";

function Post() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "content":
        setContent(value);
        break;
      default:
        break;
    }
  };

  // const saveBoard = async () => {
  //   const boardData = {
  //     title,
  //     createdBy,
  //     contents: content,
  //   };

  //   try {
  //     await axios.post('//localhost:8080/community', boardData);
  //     alert('등록되었습니다.');
  //     navigate('/community');
  //   } catch (error) {
  //     console.error('Error saving board:', error);
  //     alert('등록 중 오류가 발생했습니다.');
  //   }
  // };
  // 여기부터
  // const saveBoard = async () => {
  //   const formData = new FormData();
  //   formData.append("request", JSON.stringify({ title, content }));
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await api().post("/article/add", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰을 로컬 스토리지에서 가져옴
  //       },
  //     });
  //     alert("게시물이 등록되었습니다.");
  //     navigate("/community");
  //   } catch (error) {
  //     console.error("게시물 등록 중 오류가 발생했습니다:", error);
  //     alert("게시물 등록 중 오류가 발생했습니다.");
  //   }
  // };

  // const saveBoard = async () => {
  //   const formData = new FormData();
  //   formData.append("request", JSON.stringify({ title, content }));
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await api().post("/article/add", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     alert("게시물이 등록되었습니다.");
  //     navigate("/community");
  //   } catch (error) {
  //     console.error("게시물 등록 중 오류가 발생했습니다:", error);
  //     alert("게시물 등록 중 오류가 발생했습니다.");
  //   }
  // };

  const saveBoard = async () => {
    const formData = new FormData();
    formData.append("request", JSON.stringify({ title, content }));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api().post("/article/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response data:", response.data);
      alert("게시물이 등록되었습니다.");
      navigate("/community");
    } catch (error) {
      console.error(
        "게시물 등록 중 오류가 발생했습니다:",
        error.response || error
      );
      alert(
        `게시물 등록 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const backToList = () => {
    navigate("/community");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center justify-between p-2 border-b">
        <div className="flex flex-1 justify-start">
          <FaArrowLeft
            className="text-lg cursor-pointer"
            onClick={backToList}
          />
        </div>
        <div className="flex flex-1 justify-center">
          <img src="/image/Logo.png" alt="Logo" className="h-16" />
        </div>
        <div className="flex flex-1 justify-end">
          <button
            onClick={saveBoard}
            className="bg-[#93BF66] text-white px-3 py-1 rounded-md text-sm font-bold">
            게시
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={onChange}
          className="w-full border-b pb-2 mb-4 text-lg focus:outline-none"
        />
        <textarea
          name="content"
          placeholder="내용을 입력하세요."
          value={content}
          onChange={onChange}
          className="w-full h-32 resize-none focus:outline-none"
        />

        <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 mt-4 flex flex-col items-center justify-center cursor-pointer">
          <FaCamera className="text-3xl text-gray-400 mb-2" />
          <span className="text-gray-500">이미지 첨부하기</span>
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        </label>

        {image && (
          <div className="mt-4 relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="w-full h-40 object-cover rounded"
            />
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              X
            </button>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          * 저속한 표현, 타인의 명예훼손, 상업성, 불건전한 내용의 게시글을
          게시할 경우 임의로 삭제될 수 있으며, 무연 커뮤니티 서비스 이용에
          불이익이 갈 수 있음을 알려드립니다.
        </p>
      </main>
    </div>
  );
}

export default Post;
