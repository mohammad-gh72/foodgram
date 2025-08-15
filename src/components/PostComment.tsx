import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PostComment({
  bgColor,
  width = 100,
  submitFn,
  accessToken,
  id,
}) {
  const [comment, setComment] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: submitFn,
    onSuccess: () => {
      setComment("");
      toast.success("Comment posted successfully!");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to post comment");
    },
  });

  function submitComment(e) {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    mutate({ token: accessToken, id, comment: { text: comment } });
  }

  return (
    <form
      className="mb-4 w-[100%] flex flex-col items-start gap-4"
      onSubmit={submitComment}
    >
      <textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        style={{ width: `${width}%` }}
        className={`${bgColor} p-4 rounded-2xl`}
        placeholder="Write your comment..."
      />
      <button
        disabled={isPending}
        type="submit"
        style={{ fontSize: "14px" }}
        className={`${isPending ? "bg-gray-200 opacity-50" : "bg-white"} 
          text-black p-2 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-100`}
      >
        {isPending ? "Posting..." : "Send it"}
      </button>
    </form>
  );
}
