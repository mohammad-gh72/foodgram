import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
const PostContext = createContext(undefined);

const defaultState = { isAddPostModalOpen: false, foodImages: [] };

function authReducer(state, action) {
  switch (action.type) {
    case "OpenAddPostModal":
      return {
        ...state,
        isAddPostModalOpen: true,
      };
    case "CloseAddPostModal":
      return { ...state, isAddPostModalOpen: false, foodImages: [] };

    case "AddFoodImage":
      return {
        ...state,
        foodImages: [
          ...state.foodImages,
          ...action.payload.map((file) => ({
            id: uuidv4(),
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
            file,
          })),
        ],
      };

    case "RemoveFoodItemImage": {
      const imageToRemove = state.foodImages.find(
        (img) => img.id === action.payload
      );
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.url);
      return {
        ...state,
        foodImages: state.foodImages.filter(
          (food) => food.id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
}

function PostProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, defaultState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

function usePost() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("useAuth must be used within an PostProvider");
  }
  return context;
}

export { PostProvider, usePost };
