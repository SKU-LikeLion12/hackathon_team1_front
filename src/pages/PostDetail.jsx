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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    fetchPostData();
    fetchComments();
  }, [postId]);

  // const fetchPostData = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await api().get(`/article/${postId}`);
  //     if (response.data) {
  //       setPostData(response.data);
  //     } else {
  //       setError("게시물 데이터가 비어있습니다.");
  //     }
  //   } catch (error) {
  //     console.error("게시물을 불러오는데 실패했습니다:", error);
  //     setError("게시물을 불러오는데 실패했습니다.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const fetchComments = async () => {
  //   try {
  //     const response = await api().get(`/comment/article/${postId}`);
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error("댓글을 불러오는데 실패했습니다:", error);
  //   }
  // };

  const fetchPostData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api().get(`/article/${postId}`);
      if (response.data) {
        setPostData(response.data);
      } else {
        setError("게시물 데이터가 비어있습니다.");
      }
    } catch (error) {
      console.error(
        "게시물을 불러오는데 실패했습니다:",
        error.response ? error.response.data : error.message
      );
      setError("게시물을 불러오는데 실패했습니다.");
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
      <Headerback />

      <main className="flex-1 p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{postData.title}</h2>
          <p className="text-sm text-gray-600">
            {postData.createDate} | {postData.writer}
          </p>
          <p className="mt-2">{postData.content}</p>
          <div className="flex items-center mt-4 text-[#93BF66]">
            <FaRegComment className="mr-2" />
            <span>{comments.length}</span>
          </div>
        </div>

        <ul className="divide-y">
          {comments.map((comment) => (
            <li key={comment.commentId} className="py-2">
              <div className="flex items-start">
                <div className="flex-1">
                  {editComment.id === comment.commentId ? (
                    <div className="flex items-start">
                      <textarea
                        value={editComment.text}
                        onChange={handleEditCommentChange}
                        className="flex-1 p-2 border rounded-md focus:outline-none"
                      />
                      <button
                        onClick={() => handleEditCommentSubmit(comment.id)}
                        className="ml-2 text-[#93BF66]">
                        <BsSend className="text-xl" />
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
                            handleEditComment(
                              comment.commentId,
                              comment.content
                            )
                          }
                          className="text-xs text-[#93BF66] mt-1">
                          수정
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
