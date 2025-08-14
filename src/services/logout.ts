import { customFetch } from "@utils";

export default async function logout() {
  try {
    const res = await customFetch.post(
      "/api/auth/logout",
      {},
      { withCredentials: true }
    );
    return res.status;
  } catch (error) {
    return error;
  }
}
