import { usePost } from "src/features/post/PostContext";
import DragAndDropFile from "./DragAndDropFile";
import postFood from "src/services/postFood";
import { useAuth } from "src/features/auth/AuthContext";
import z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postSchema = z.object({
  title: z.string().min(6, "Title must be at least 6 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  recipe: z
    .string()
    .trim()
    .refine((val) => val.length === 0 || val.length >= 10, {
      message: "Recipe must be at least 10 characters if provided",
    }),
});

function AddPostModal() {
  const { state: postState, dispatch } = usePost();
  const { state: authState } = useAuth();
  const [postForm, setPostForm] = useState({
    title: "",
    recipe: "",
    description: "",
  });
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: postFood,
    onSuccess: () => {
      toast.success("Your post has been submitted");
      queryClient.invalidateQueries("posts");
      dispatch({ type: "CloseAddPostModal" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [errors, setErrors] = useState({});

  function handlePostForm(e) {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  }

  function submitPostFood(e) {
    e.preventDefault();

    const result = postSchema.safeParse(postForm);

    if (!result.success) {
      const objError = {};
      result.error.issues?.forEach((err) => {
        objError[err.path[0]] = err.message;
        toast.error(objError[err.path[0]]);
      });
      setErrors(objError);
      setTimeout(() => {
        setErrors({});
      }, 1000);
      return; // prevent submitting when errors exist
    }

    if (postState?.foodImages.length === 0) {
      toast.error("You should at least select one image");
      setErrors({ imageError: "You should at least select one image" });
      setTimeout(() => {
        setErrors({});
      }, 1000);
      return;
    }

    const formData = new FormData();
    formData.append("title", postForm.title);
    formData.append("recipe", postForm.recipe);
    formData.append("description", postForm.description);
    postState?.foodImages.forEach((item) =>
      formData.append(`images`, item.file)
    );

    mutate({ token: authState.accessToken, food: formData });
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <form
        onSubmit={submitPostFood}
        className="relative gap-4 w-[50%] max-w-lg bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] rounded-2xl flex flex-col items-center p-6 shadow-2xl border border-white/30"
      >
        {/* Close Button */}
        <img
          src="./greenclose.png"
          alt="close"
          className="w-8 absolute -top-3 -right-3 hover:scale-110 transition-transform duration-150 cursor-pointer drop-shadow-lg bg-white rounded-full p-1"
          onClick={() => {
            dispatch({ type: "CloseAddPostModal" });
          }}
        />

        {/* Title */}
        <input
          onChange={handlePostForm}
          value={postForm.title}
          name="title"
          type="text"
          className="bg-white rounded-lg p-3 w-full text-gray-800 border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-300 outline-none"
          placeholder="Title..."
        />

        {/* Description */}
        <textarea
          onChange={handlePostForm}
          value={postForm.description}
          name="description"
          className="bg-white rounded-lg p-3 w-full text-gray-800 border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-300 outline-none min-h-[90px]"
          placeholder="Description..."
        />

        {/* Recipe */}
        <textarea
          onChange={handlePostForm}
          value={postForm.recipe}
          name="recipe"
          className="bg-white rounded-lg p-3 w-full text-gray-800 border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-300 outline-none min-h-[80px]"
          placeholder="Recipe..."
        />

        {/* File Upload */}
        <div className="w-full">
          <DragAndDropFile />
        </div>

        {/* Post Button */}
        <button
          disabled={Object.keys(errors).length !== 0 || isPending}
          className={`mt-4 self-end font-semibold text-white  px-5 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-150 shadow-lg ${Object.keys(errors).length === 0 || !isPending ? "bg-gradient-to-r from-red-400 to-red-500" : "bg-gray-300"}`}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddPostModal;
