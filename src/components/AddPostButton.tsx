import { usePost } from "src/features/post/PostContext";

function AddPostButton() {
  const { dispatch } = usePost();
  return (
    <img
      role="button"
      title="Add a new post"
      onClick={() => {
        dispatch({ type: "OpenAddPostModal" });
      }}
      src="./addpost.png"
      alt="add post"
      className="w-[50px] cursor-pointer "
    />
  );
}
export default AddPostButton;
