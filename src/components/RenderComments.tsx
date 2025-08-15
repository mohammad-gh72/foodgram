import { useState } from "react";
import PostComment from "./PostComment";
import { postReply } from "src/services/postCommentAndReply";
import { useAuth } from "src/features/auth/AuthContext";

function RenderComments({ comments }) {
  return (
    <div className="flex-1  origin-left  font-medium max-w-[100%]">
      {comments?.map((comment) => (
        <RecursiveComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default RenderComments;

function RecursiveComment({ comment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const { state: authState } = useAuth();

  function showExpandBtn(comment) {
    if (comment?.comments?.length === 0) return;
    if (!isOpen) {
      return (
        <button
          style={{ fontSize: "14px" }}
          className="text-blue-500 cursor-pointer "
          onClick={() => setIsOpen(true)}
        >
          Open Replies
        </button>
      );
    }
    if (isOpen) {
      return (
        <button
          style={{ fontSize: "14px" }}
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Close Replies
        </button>
      );
    }
  }
  //------------------
  return (
    <div
      className={`ml-4 mt-2 pl-2  ${
        comment?.comments?.length > 0 && isOpen ? "border-l-1" : ""
      }`}
    >
      <div className="bg-purple-100 p-4 rounded-2xl flex flex-col items-start ">
        <div className="flex flex-col gap-4  items-start">
          <div className="flex gap-2 justify-center items-center">
            <img
              className="w-[20px]"
              src={comment?.user?.profilePicture || "./avatar.png"}
              alt={comment?.user?.username}
            />
            <h3 style={{ fontSize: "10px" }} className="">
              {comment?.user?.username}
            </h3>
          </div>
          <p>{comment.text}</p>
        </div>
        <div className="flex gap-4 mt-4">
          {showExpandBtn(comment)}
          <button
            onClick={() => setIsReplyOpen((prev) => !prev)}
            style={{ fontSize: "14px" }}
            className="text-blue-800 cursor-pointer"
          >
            {isReplyOpen ? "✖reply" : "reply"}
          </button>
        </div>
        <div className="mt-4 w-[60%]">
          {isReplyOpen && (
            <PostComment
              submitFn={postReply}
              accessToken={authState.accessToken}
              id={comment._id}
              width={70}
              bgColor="bg-amber-50"
            />
          )}
        </div>
      </div>

      {isOpen && comment.comments?.length > 0 && (
        <div>
          {comment.comments.map((child) => (
            <RecursiveComment key={child.id} comment={child} />
          ))}
        </div>
      )}
    </div>
  );
}
