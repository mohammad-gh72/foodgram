import { customFetch } from "@utils";

//Like a post
export async function likePost({ postId, accessToken }) {
  try {
    const response = await customFetch.post(
      `/api/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong, please try again later"
    );
  }
}

// Unlike a post
export async function unlikePost({ postId, accessToken }) {
  try {
    const response = await customFetch.delete(`/api/posts/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong, please try again later"
    );
  }
}

// Check if liked
export function isLikedByUser(post, userId) {
  return post?.likes.some((like) => like.userId === userId);
}
