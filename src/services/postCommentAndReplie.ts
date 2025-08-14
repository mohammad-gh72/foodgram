import { customFetch } from "@utils";

export default async function postComment({ token, postId, comment }) {
  try {
    const res = await customFetch.post(
      `/api/posts/${postId}/comment`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}
