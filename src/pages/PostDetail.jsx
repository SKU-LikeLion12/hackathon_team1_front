import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Headerback from "../components/Headerback";
import api from "../api/api";

function PostDetail() {
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState({ id: null, text: "" });
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    fetchPostData();
    fetchComments();
  }, [postId]);

  const fetchPostData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api().get(`/article/${postId}`);
      if (response.data) {
        setPostData(response.data);
        setEditedPostContent(response.data.content);
      } else {
        setError("게시물 데이터가 비어있습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } else {
        console.error(
          "게시물을 불러오는데 실패했습니다:",
          error.response ? error.response.data : error.message
        );
        setError("게시물을 불러오는데 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api().get(`/comment/article/${postId}`);
      if (response.data) {
        setComments(response.data);
      } else {
        setError("댓글 데이터가 비어있습니다.");
      }
    } catch (error) {
      console.error(
        "댓글을 불러오는데 실패했습니다:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const moveBack = () => {
    navigate(-1);
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleNewCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    try {
      await api().post(
        `/comment`,
        {
          articleId: postId,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchComments();
      setNewComment("");
    } catch (error) {
      console.error("댓글 추가에 실패했습니다:", error);
    }
  };

  const handleEditCommentChange = (e) => {
    setEditComment({ ...editComment, text: e.target.value });
  };

  const handleEditComment = (id, text) => {
    setEditComment({ id, text });
  };

  const handleEditCommentSubmit = async (id) => {
    try {
      await api().put(
        `/comment`,
        {
          commentId: id,
          content: editComment.text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchComments();
      setEditComment({ id: null, text: "" });
    } catch (error) {
      console.error("댓글 수정에 실패했습니다:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        await api().delete("/comment", {
          data: {
            commentId: commentId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchComments(); // 댓글 목록 새로고침
      } catch (error) {
        console.error("댓글 삭제에 실패했습니다:", error);
      }
    }
  };

  const handleEditPostChange = (e) => {
    setEditedPostContent(e.target.value);
  };

  const handleEditPostSubmit = async () => {
    const formData = new FormData();

    formData.append("title", "");
    formData.append("content", editedPostContent);
    if (false) {
      formData.append("image", null);
    }
    try {
      await api().put(`/article/${postId}`, formData, {
        data: {
          articleId: postId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchPostData();
      setIsEditingPost(false);
    } catch (error) {
      console.error("게시물 수정에 실패했습니다:", error);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("이 게시물을 삭제하시겠습니까?")) {
      try {
        await api().delete(`/article/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        navigate("/community"); // 삭제 후 홈으로 이동하거나 적절한 페이지로 리디렉션
      } catch (error) {
        console.error("게시물 삭제에 실패했습니다:", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!postData) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="App flex flex-col h-screen max-w-lg mx-auto">
      <div onClick={moveBack}>
        <Headerback />
      </div>

      <main className="flex-1 p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{postData.title}</h2>
          <p className="text-sm text-gray-600">
            {postData.createDate} | {postData.writer}
          </p>
          {postData.image && (
            <div className="mt-4 relative">
              <img
                src={`data:image/png;base64,${postData.image}`}
                alt="Selected"
                className="w-full h-40 object-cover rounded"
              />
            </div>
          )}

          {isEditingPost ? (
            <div>
              <textarea
                value={editedPostContent}
                onChange={handleEditPostChange}
                className="w-full p-2 border rounded-md focus:outline-none"
              />
              <button
                onClick={handleEditPostSubmit}
                className="mt-2 text-[#93BF66]">
                <div className="text-xl" />
                수정완료
              </button>
              <button
                onClick={() => setIsEditingPost(false)}
                className="ml-2 text-[#93BF66]">
                취소
              </button>
            </div>
          ) : (
            <>
              <p className="mt-2">{postData.content}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => setIsEditingPost(true)}
                  className="text-[#93BF66]">
                  수정
                </button>
                <button onClick={handleDeletePost} className="text-[#93BF66]">
                  삭제
                </button>
              </div>
            </>
          )}

          <div className="flex items-center mt-4 text-[#93BF66]">
            <FaRegComment className="mr-2" />
            <span>{comments.length}</span>
          </div>
        </div>

        <ul className="divide-y">
          {comments.map((comment) => (
            <li key={comment.id} className="py-2">
              <div className="flex items-start">
                <div className="flex-1">
                  {editComment.id === comment.id ? (
                    <div className="flex items-start">
                      <textarea
                        value={editComment.text}
                        onChange={handleEditCommentChange}
                        className="flex-1 p-2 border rounded-md focus:outline-none"
                      />
                      <button
                        onClick={() => handleEditCommentSubmit(comment.id)}
                        className="ml-2 text-[#93BF66]">
                        <FaRegComment className="text-xl" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold">{comment.writer}</p>
                      <p className="text-xs text-gray-500">
                        {comment.createDate}
                      </p>
                      <p className="mt-1">{comment.content}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleEditComment(comment.id, comment.content)
                          }
                          className="text-xs text-[#93BF66] mt-1">
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-xs text-[#93BF66] mt-1">
                          삭제
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="댓글을 입력하세요."
            value={newComment}
            onChange={handleNewCommentChange}
            className="flex-1 border-b p-2 focus:outline-none"
          />
          <button
            onClick={handleNewCommentSubmit}
            className="ml-2 text-[#93BF66]">
            <BsSend className="text-xl" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PostDetail;
