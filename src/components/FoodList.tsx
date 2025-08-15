import { getPosts } from "@services";
import FoodItem from "./FoodItem";
import { useCustomQueryHook } from "../customHooks/customQuerHook";
function FoodList() {
  const { isLoading, error, data } = useCustomQueryHook("posts", getPosts);

  return (
    <div className="flex flex-col justify-center items-center gap-16 w-full ">
      <FoodItem data={data} />
    </div>
  );
}

export default FoodList;
