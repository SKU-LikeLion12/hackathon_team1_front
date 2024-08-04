import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaPen,
  FaUser,
  FaHome,
  FaPencilAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Community() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const postsPerPage = 4; // 페이지 당 게시물 수
  const [posts, setPosts] = useState([]); // api 연결

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api().get("/articles/all");
      setPosts(response.data);
    } catch (error) {
      console.error("게시물을 불러오는데 실패했습니다:", error);
    }
  };

  // 게시물 필터링 로직
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 현재 페이지에 표시할 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPostDetail = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-[500px] mx-auto relative">
      {/* 무연 */}
      <header className="flex items-center justify-between p-2 border-b">
        <div className="flex flex-1 justify-center">
          <img src="/image/Logo.png" alt="Logo" className="h-16" />
        </div>
        <FaSearch
          className="text-lg"
          onClick={() => setShowSearch(!showSearch)}
        />
      </header>

      {/* 검색 입력 필드 */}
      {showSearch && (
        <div className="p-2 border-b">
          <input
            id="searchInput"
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {/* 내용 */}
      <main className="flex-1 overflow-y-auto pb-32 pt-20">
        <ul className="divide-y">
          {currentPosts.map((post, index) => (
            <li key={index} className="py-2 px-3">
              <h3 className="font-semibold text-sm">{post.title}</h3>
              <p className="text-xs text-gray-500">{post.subtitle}</p>
              <div className="flex items-center text-xs text-gray-400 mt-0.5">
                {post.comments > 0 && (
                  <>
                    <span className="text-[#93BF66]">💬 {post.comments}</span>
                    <span className="mx-1">|</span>
                  </>
                )}
                <span>{post.timeAgo}</span>
                <span className="mx-1">|</span>
                <span>{post.author}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* 페이지네이션 및 글쓰기 버튼 */}
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] py-2 bg-white border-t">
        <div className="flex justify-center items-center">
          <button
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            className="mx-2 text-sm"
            disabled={currentPage === 1}>
            {"<"}
          </button>
          {[
            ...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys(),
          ].map((number) => (
            <button
              key={number + 1}
              onClick={() => goToPage(number + 1)}
              className={`mx-2 text-sm ${currentPage === number + 1 ? "font-bold" : ""}`}>
              {number + 1}
            </button>
          ))}
          <button
            onClick={() =>
              currentPage < Math.ceil(filteredPosts.length / postsPerPage) &&
              goToPage(currentPage + 1)
            }
            className="mx-2 text-sm"
            disabled={
              currentPage === Math.ceil(filteredPosts.length / postsPerPage)
            }>
            {">"}
          </button>
        </div>
        <Link
          to="/Post"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#93BF66] text-white rounded-full flex items-center justify-center shadow-lg">
          <FaPen className="text-xs" />
        </Link>
      </div>

      {/* 메뉴 */}
      <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] flex justify-around items-center py-2 border-t bg-white">
        <button className="flex flex-col items-center">
          <FaUser className="text-lg mb-0.5" />
          <span className="text-xs">마이페이지</span>
        </button>
        <button className="flex flex-col items-center">
          <FaHome className="text-lg mb-0.5" />
          <span className="text-xs">홈</span>
        </button>
        <button
          onClick={() => goToPage(1)}
          className="flex flex-col items-center">
          <FaPencilAlt className="text-lg mb-0.5" />
          <span className="text-xs">커뮤니티</span>
        </button>
      </footer>
    </div>
  );
}

const posts = [
  {
    title: "전자담배 추천",
    subtitle: "무슨 담배가 좋을까",
    comments: 2,
    timeAgo: "44분 전",
    author: "김**",
  },
  {
    title: "연초 추천",
    subtitle: "무슨 담배가 좋을까",
    comments: 0,
    timeAgo: "07/06",
    author: "김**",
  },
  {
    title: "금연껌 추천",
    subtitle: "무슨 껌이 좋을까",
    comments: 0,
    timeAgo: "07/06",
    author: "김**",
  },
  {
    title: "금연 보조제 추천",
    subtitle: "우리 다 같이 금연해봐요",
    comments: 4,
    timeAgo: "07/06",
    author: "김**",
  },
  {
    title: "금연 5일차",
    subtitle: "죽고싶다...",
    comments: 0,
    timeAgo: "07/04",
    author: "김**",
  },
  {
    title: "단기간 금연 성공하신분",
    subtitle: "5년핀 담배 단기간에 끊을 수 있나",
    comments: 0,
    timeAgo: "07/06",
    author: "김**",
  },
  {
    title: "다들 금연할 때 전담까지 다 끊음?",
    subtitle: "전담도 안 하면 너무 힘든데",
    comments: 1,
    timeAgo: "07/06",
    author: "김**",
  },
  {
    title: "게시글 미리보기 길어질 때 예시!",
    subtitle:
      "게시글 미리보기가 길어질 때는 이렇게 표시될 예정입니다. 말줄임표로...",
    comments: 3,
    timeAgo: "07/06",
    author: "김**",
  },
];

export default Community;
