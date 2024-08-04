import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

function PostPhoto() {
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [editComment, setEditComment] = useState({ id: null, text: "" });
  const [editReply, setEditReply] = useState({
    parentId: null,
    id: null,
    text: "",
  });

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    // 실제 구현에서는 여기서 API를 호출
    const fetchedPostData = {
      id: postId,
      title: "여자고 담배피는데",
      date: "07 / 05",
      author: "익명",
      content: "누가 피냐고 물어보면 솔직하게 말함?",
      commentCount: 6,
      imageUrl: "/image/1.png", // 이미지 URL 추가
    };
    setPostData(fetchedPostData);

    // 댓글 데이터도 여기서
    const fetchedComments = [
      {
        id: 1,
        author: "박**",
        text: "웅 난 그냥 다 말해",
        time: "45분 전",
        profilePic: "https://via.placeholder.com/40",
        replies: [],
      },
      {
        id: 2,
        author: "강**",
        text: "걍 굳이... 그런 말은 안하는게 나음",
        time: "07 / 05",
        profilePic: "https://via.placeholder.com/40",
        replies: [],
      },
      {
        id: 3,
        author: "최**",
        text: "담배피는게 흠임?",
        time: "07 / 06",
        profilePic: "https://via.placeholder.com/40",
        replies: [],
      },
      {
        id: 4,
        author: "김**",
        text: "말하고 싶으면 하는 거고 아님 마는거지",
        time: "07 / 06",
        profilePic: "https://via.placeholder.com/40",
        replies: [],
      },
      {
        id: 5,
        author: "김**",
        text: "ㅋㅋ",
        time: "07 / 07",
        profilePic: "https://via.placeholder.com/40",
        replies: [],
      },
      {
        id: 6,
        author: "류**",
        text: "강 하셈",
        time: "07 / 07",
        profilePic: "https://via.placeholder.com/40",
        replies: [],
      },
    ];
    setComments(fetchedComments);
  }, [postId]);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleNewCommentSubmit = () => {
    if (newComment.trim() === "") return;

    if (replyingTo) {
      // 대댓글 추가
      const newReply = {
        id: Date.now(),
        author: "익명",
        text: newComment,
        time: "방금 전",
        profilePic: "https://via.placeholder.com/40",
      };

      setComments(
        comments.map((comment) =>
          comment.id === replyingTo
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setReplyingTo(null);
    } else {
      // 새 댓글 추가
      const newCommentData = {
        id: comments.length + 1,
        author: "익명",
        text: newComment,
        time: "방금 전",
        profilePic: "https://via.placeholder.com/40",
        replies: [],
      };
      setComments([newCommentData, ...comments]);
    }

    setNewComment("");
  };

  const handleReplyClick = (parentId) => {
    setReplyingTo(parentId);
    setNewComment(""); // 입력창 초기화
  };

  const handleEditCommentChange = (e) => {
    setEditComment({ ...editComment, text: e.target.value });
  };

  const handleEditReplyChange = (e, parentId) => {
    setEditReply({ ...editReply, text: e.target.value });
  };

  const handleEditComment = (id, text) => {
    setEditComment({ id, text });
  };

  const handleEditReply = (parentId, id, text) => {
    setEditReply({ parentId, id, text });
  };

  const handleEditCommentSubmit = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, text: editComment.text } : comment
      )
    );
    setEditComment({ id: null, text: "" });
  };

  const handleEditReplySubmit = (parentId, id) => {
    setComments(
      comments.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === id ? { ...reply, text: editReply.text } : reply
              ),
            }
          : comment
      )
    );
    setEditReply({ parentId: null, id: null, text: "" });
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App flex flex-col h-screen max-w-lg mx-auto">
      {/* 무연 */}
      <header className="flex items-center justify-between p-4 border-b">
        <FaArrowLeft
          className="text-xl cursor-pointer"
          onClick={() => navigate("/community")}
        />
        <h1 className="text-lg font-semibold">無연</h1>
        <div className="w-6" />
      </header>

      {/* Post 내용 */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{postData.title}</h2>
          <p className="text-sm text-gray-600">
            {postData.date} | {postData.author}
          </p>
          <p className="mt-2">{postData.content}</p>
          {postData.imageUrl && (
            <div className="mt-4 w-[300px] h-[300px] mx-auto">
              <img
                src={postData.imageUrl}
                alt="게시글 이미지"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="flex items-center mt-4 text-blue-500">
            <FaRegComment className="mr-2" />
            <span>{postData.commentCount}</span>
          </div>
        </div>

        {/* 댓글 */}
        <ul className="divide-y">
          {comments.map((comment) => (
            <li key={comment.id} className="py-2">
              <div className="flex items-start">
                <img
                  src={comment.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
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
                        className="ml-2 text-blue-500">
                        <BsSend className="text-xl" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold">{comment.author}</p>
                      <p className="text-xs text-gray-500">{comment.time}</p>
                      <p className="mt-1">{comment.text}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReplyClick(comment.id)}
                          className="text-xs text-blue-500 mt-1">
                          답글 달기
                        </button>
                        <button
                          onClick={() =>
                            handleEditComment(comment.id, comment.text)
                          }
                          className="text-xs text-blue-500 mt-1">
                          수정
                        </button>
                      </div>
                    </>
                  )}

                  {/* 답글 */}
                  {comment.replies.length > 0 && (
                    <ul className="mt-2 space-y-2 pl-4 border-l border-gray-300">
                      {comment.replies.map((reply) => (
                        <li key={reply.id} className="flex items-start">
                          <img
                            src={reply.profilePic}
                            alt="Profile"
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div className="flex-1">
                            {editReply.parentId === comment.id &&
                            editReply.id === reply.id ? (
                              <div className="flex items-start">
                                <textarea
                                  value={editReply.text}
                                  onChange={(e) =>
                                    handleEditReplyChange(e, comment.id)
                                  }
                                  className="flex-1 p-2 border rounded-md focus:outline-none"
                                />
                                <button
                                  onClick={() =>
                                    handleEditReplySubmit(comment.id, reply.id)
                                  }
                                  className="ml-2 text-blue-500">
                                  <BsSend className="text-xl" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm font-semibold">
                                  {reply.author}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {reply.time}
                                </p>
                                <p className="mt-1">{reply.text}</p>
                                <button
                                  onClick={() =>
                                    handleEditReply(
                                      comment.id,
                                      reply.id,
                                      reply.text
                                    )
                                  }
                                  className="text-xs text-blue-500 mt-1">
                                  수정
                                </button>
                              </>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* 댓글 입력 */}
      <footer className="p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            placeholder={
              replyingTo ? "대댓글을 입력하세요." : "댓글을 입력하세요."
            }
            value={newComment}
            onChange={handleNewCommentChange}
            className="flex-1 border-b p-2 focus:outline-none"
          />
          <button
            onClick={handleNewCommentSubmit}
            className="ml-2 text-blue-500">
            <BsSend className="text-xl" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PostPhoto;
