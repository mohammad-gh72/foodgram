import { getPosts } from "@services";
import PostItem from "./PostItem";
import { useCustomQueryHook } from "../customHooks/customQuerHook";
function PostsList() {
  const { isLoading, error, data } = useCustomQueryHook("posts", getPosts);

  return (
    <div className="flex flex-col justify-center items-center gap-16 w-full  ">
      <PostItem data={data} />
    </div>
  );
}

export default PostsList;
