import { useEffect, useState } from "react";
import foodmarginStyle from "../styles/foodmarginStyle.module.css";
import RenderComments from "./RenderComments";
import { createPortal } from "react-dom";
import ImageModal from "./ImageSliderModal";
import PostComment from "./PostComment";
import { useAuth } from "src/features/auth/AuthContext";
import { postComment } from "src/services/postCommentAndReply";
import Like from "./Like";
import { preperImages } from "src/utils/preperImages";

function FoodItem({ data }) {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState({});
  const { state: authState } = useAuth();

  const toggleComments = (postId) => {
    setIsCommentSectionOpen((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <>
      {data?.posts?.map((post) => (
        <div
          key={post._id}
          className={`${foodmarginStyle.foodmargin} relative bg-[#f5f5f5] p-8 w-[80%] rounded-lg shadow-md flex flex-col`}
          style={{ boxShadow: "0px 2px 7px -2px rgba(0,0,0,0.28)" }}
        >
          {/* Post content */}
          <div className="grid grid-cols-[1fr_auto] gap-6">
            <PostTextContent post={post} />
            <PostThumbnail post={post} />
          </div>

          <hr className="my-4 opacity-50" />

          {/* Buttons row (fixed) */}
          <div className="flex justify-between items-center mb-2">
            <CommentToggle
              post={post}
              isOpen={!!isCommentSectionOpen[post._id]}
              toggle={() => toggleComments(post._id)}
            />
            {authState.user && <Like post={post} />}
          </div>

          {/* Comments section (expand independently) */}
          {isCommentSectionOpen[post._id] && <CommentsSection post={post} />}
        </div>
      ))}
    </>
  );
}

export default FoodItem;

// -------------------------- CommentToggle --------------------------
function CommentToggle({ post, isOpen, toggle }) {
  return (
    <div
      onClick={toggle}
      role="button"
      className="flex items-center gap-1 cursor-pointer text-blue-400 hover:scale-[1.1] transition-all duration-100"
    >
      <span>{isOpen ? "Close Comments" : "Comments"}</span>
      {!isOpen && (
        <span
          className={`text-sm ${
            post.comments.length > 0 ? "text-[#4BAE4F]" : "text-gray-300"
          }`}
        >
          ({post.comments.length})
        </span>
      )}
    </div>
  );
}

// -------------------------- PostTextContent --------------------------
function PostTextContent({ post }) {
  console.log(post.recipe);
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
        {post.recipe && (
          <>
            <h3 className="bg-red-200 p-2 w-fit rounded-lg text-black mt-8 mb-2 shadow-sm">
              Recipe
            </h3>
            <ul className="list-disc list-inside text-gray-800">
              <li>{post.recipe}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

// -------------------------- PostThumbnail --------------------------
function PostThumbnail({ post }) {
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const preperedThumbnail = preperImages(post.images[0]);
  useEffect(() => {
    document.body.style.overflow = isOpenImageModal ? "hidden" : "auto";
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
        src={preperedThumbnail}
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

// -------------------------- CommentsSection --------------------------
function CommentsSection({ post }) {
  const { state } = useAuth();

  return (
    <div className="flex flex-col bg-[#FFEDD4] p-3 rounded-lg shadow-sm mt-4 max-h-[450px] overflow-y-auto">
      {state.user && (
        <PostComment
          bgColor="bg-white"
          submitFn={postComment}
          accessToken={state.accessToken}
          id={post._id}
        />
      )}

      {post.comments.length > 0 ? (
        <div className="flex-1 mt-2">
          <RenderComments comments={post.comments} />
        </div>
      ) : (
        <div className="bg-red-400 rounded-3xl text-white p-2 w-full flex justify-center items-center text-sm font-medium shadow">
          No comments yet on this post
        </div>
      )}
    </div>
  );
}
