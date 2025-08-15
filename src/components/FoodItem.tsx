import { useEffect, useState } from "react";
import foodmarginStyle from "../styles/foodmarginStyle.module.css";
import RenderComments from "./RenderComments";
import { createPortal } from "react-dom";
import ImageModal from "./ImageSliderModal";
import PostComment from "./PostComment";
import { useAuth } from "src/features/auth/AuthContext";
import { postComment } from "src/services/postCommentAndReply";

function FoodItem({ data }) {
  return (
    <>
      {data?.posts?.map((post) => {
        return (
          <div
            style={{ boxShadow: "0px 2px 7px -2px rgba(0,0,0,0.28)" }}
            key={post._id}
            className={`${foodmarginStyle.foodmargin} grid grid-cols-[1fr_auto] gap-6 bg-[#f5f5f5] p-8 w-[80%] rounded-lg shadow-md`}
          >
            <PostTextContent post={post} />
            <PostThumbnail post={post} />
            {/* Comments section always full width when open */}
            <div className="col-span-2">
              <CommentsSection post={post} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FoodItem;

function PostTextContent({ post }) {
  return (
    <div>
      <h2 className="bg-[#FEECEF] p-4 rounded-lg text-black w-[80%] text-lg font-bold capitalize mb-8 shadow-sm">
        {post.title}
      </h2>
      <div className="p-4 w-[92%] text-black rounded-lg bg-white shadow-sm">
        <div className="flex relative">
          <img
            src="./pen.png"
            alt="pen"
            className="w-5 absolute -top-8 -left-4"
          />
          <p className="leading-relaxed">{post.description}</p>
        </div>
      </div>
      <div>
        <h3 className="bg-red-200 p-2 w-fit rounded-lg text-black mt-8 mb-2 shadow-sm">
          Recipe
        </h3>
        <ul className="list-disc list-inside text-gray-800">
          <li>{post.recipe}</li>
        </ul>
      </div>
    </div>
  );
}

function PostThumbnail({ post }) {
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);

  useEffect(() => {
    if (!isOpenImageModal) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isOpenImageModal]);

  function closeModal() {
    setIsOpenImageModal(false);
  }

  return (
    <div className="w-fit justify-self-end h-fit cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out">
      <img
        className={`rounded-lg w-[200px] h-[200px] object-cover shadow-md ${
          !post.thumbnail ? "opacity-40" : ""
        }`}
        src={!post.thumbnail ? "./thmb.jpg" : post.thumbnail}
        alt={post.title}
        onClick={() => setIsOpenImageModal(true)}
      />

      {isOpenImageModal &&
        createPortal(
          <ImageModal imgArr={post.images} closeModal={closeModal} />,
          document.body
        )}
    </div>
  );
}

function CommentsSection({ post }) {
  const [isOpen, SetIsOpen] = useState(false);
  const { state } = useAuth();

  if (!isOpen) {
    return (
      <>
        <hr className="mb-8 mt-4 opacity-9" />
        <span
          role="button"
          className="w-fit mt-4 text-blue-500 cursor-pointer hover:scale-110 transition-transform duration-150 font-medium"
          onClick={() => SetIsOpen(true)}
        >
          Comments&nbsp;
          <span
            style={{ fontSize: "14px" }}
            className={` ${post.comments.length > 0 ? "text-[#4BAE4F]" : "text-gray-300"}`}
          >
            ({post.comments.length})
          </span>
        </span>
      </>
    );
  }

  return (
    <>
      <hr className="mb-8 mt-4 opacity-9" />
      <span
        role="button"
        className="w-fit mt-4 text-blue-500 cursor-pointer hover:scale-110 transition-transform duration-150 font-medium"
        onClick={() => SetIsOpen(false)}
      >
        Close Comments
      </span>
      <div
        className="flex flex-col bg-[#FFEDD4] p-3 rounded-lg shadow-sm mt-4"
        style={{
          height: "450px", // ✅ a little taller for more visible comments
        }}
      >
        {state.user && (
          <PostComment
            bgColor="bg-white"
            submitFn={postComment}
            accessToken={state.accessToken}
            id={post._id}
          />
        )}
        <div className="flex-1 overflow-y-auto mt-2">
          <RenderComments comments={post.comments} />
        </div>
        {post?.comments.length === 0 && (
          <div className="bg-red-400 rounded-3xl text-white p-2 w-full flex justify-center items-center text-sm font-medium shadow">
            No comments yet on this post
          </div>
        )}
      </div>
    </>
  );
}
