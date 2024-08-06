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
import Footer from "../components/Footer";

function Community() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const postsPerPage = 10; // 페이지 당 게시물 수
  const [posts, setPosts] = useState([]); // api 연결

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api().get("/articles/all");
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
      );
      setPosts(sortedPosts);
      console.log(sortedPosts);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } else {
        console.error("게시물을 불러오는데 실패했습니다:", error);
      }
    }
  };

  const filteredPosts = posts.filter((post) => {
    const title = post.title ? post.title.toLowerCase() : "";
    const content = post.content ? post.content.toLowerCase() : "";
    const query = searchQuery.toLowerCase();

    return title.includes(query) || content.includes(query);
  });

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
      <header className="flex items-center justify-between p-2 border-b">
        <div className="flex flex-1 justify-center">
          <img src="/image/Logo.png" alt="Logo" className="h-16" />
        </div>
        <FaSearch
          className="text-lg"
          onClick={() => setShowSearch(!showSearch)}
        />
      </header>

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

      <main className="flex-1 overflow-y-auto pb-32 flex flex-col justify-center">
        <ul className="divide-y">
          {currentPosts.map((post, index) => (
            <li
              key={post.id}
              className="py-2 px-3"
              onClick={() => goToPostDetail(post.id)}>
              <h3 className="font-semibold text-sm">{post.title}</h3>
              <p className="text-xs text-gray-500">
                {post.content ? post.content.substring(0, 50) : ""}...
              </p>
              <div className="flex items-center text-xs text-gray-400 mt-0.5">
                {post.commentCount >= 0 && (
                  <>
                    <span className="text-[#93BF66]"></span>
                    💬
                    <span className="mx-1"> {post.commentCount}|</span>
                  </>
                )}
                <span>{new Date(post.createDate).toLocaleString()}</span>
                <span className="mx-1">|</span>
                <span>{post.writer}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>

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

      <Footer />
    </div>
  );
}

export default Community;
