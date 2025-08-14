import { customFetch } from "@utils";

export default async function refreshToken(state, dispatch) {
  try {
    const res = await customFetch.post(
      "/api/auth/refresh",
      {},
      { withCredentials: true }
    );
    dispatch({
      type: "Login",
      payload: {
        user: state.user, // Assumes user is still valid
        accessToken: res.data.accessToken,
      },
    });
    console.log(res);
  } catch (error) {
    console.error("Token refresh failed:", error);
    dispatch({ type: "LOGOUT" });
  }
}
