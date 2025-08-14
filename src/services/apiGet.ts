import { customFetch } from "@utils";

export async function getPosts() {
  const response = await customFetch("/api/posts");
  return response.data;
}
