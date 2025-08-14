import { customFetch } from "@utils";

export default async function postFood({ token, food }) {
  try {
    const res = await customFetch.post("/api/posts", food, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Something went wrong try again later");
  }
}
