import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "src/features/auth/AuthContext";
import { isLikedByUser, likePost, unlikePost } from "src/services/likePost";

function Like({ post }) {
  const { state: authState } = useAuth();
  const [alreadyLiked, setAlreadyLiked] = useState(
    isLikedByUser(post, authState.user.userId)
  );
  const queryClient = useQueryClient();
  const { mutate: submitMutate } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      toast.success("Thanks for your like !");
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      toast.success("Done!");
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function submiteLike() {
    submitMutate({ postId: post._id, accessToken: authState.accessToken });
  }
  function deleteLike() {
    deleteMutate({ postId: post._id, accessToken: authState.accessToken });
  }

  useEffect(() => {
    const doseUserAlreayLiked = isLikedByUser(post, authState.user.userId);
    setAlreadyLiked(doseUserAlreayLiked);
  }, [post, authState.user.userId]);

  return (
    <div className=" flex flex-col justify-center items-center">
      <svg
        role="button"
        onClick={!alreadyLiked ? submiteLike : deleteLike}
        className={` cursor-pointer hover:scale-[1.1] transition-all duration-200  ${alreadyLiked ? "fill-red-400" : "fill-white"}`}
        viewBox="0 0 560 512"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
      >
        <path
          d="M471.701,73.91
             c-54.058-46.195-136.93-38.93-186.566,13.097
             l-14.735,15.02
             l-14.734-15.02
             c-49.637-52.028-132.508-59.292-186.566-13.097
             c-62.448,53.372-66.175,149.379-9.905,207.554
             l193.648,197.683
             c12.288,12.54,32.218,12.54,44.506,0
             l193.648-197.683
             C537.876,223.288,534.149,127.282,471.701,73.91
             z"
          stroke="gray"
          strokeWidth="16"
        />
      </svg>
      <span>{post?.likes.length || null}</span>
    </div>
  );
}

export default Like;
