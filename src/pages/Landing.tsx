import { PostList } from "@components";
import { createPortal } from "react-dom";
import AddPostModal from "src/components/AddPostModal";
import { usePost } from "src/features/post/PostContext";

function Landing() {
  const { state } = usePost();

  return (
    <div className="align-element rounded-2xl p-16">
      <PostList />
      {state.isAddPostModalOpen &&
        createPortal(<AddPostModal />, document.body)}
    </div>
  );
}
export default Landing;
