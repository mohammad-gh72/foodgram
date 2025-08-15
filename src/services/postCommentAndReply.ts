import { customFetch } from "@utils";

export async function postComment({ token, id, comment }) {
  try {
    const res = await customFetch.post(`/api/posts/${id}/comment`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong! please try again later");
  }
}
export async function postReply({ token, id, comment }) {
  try {
    const res = await customFetch.post(
      `/api/posts/comment/${id}/reply`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong! please try again later");
  }
}
