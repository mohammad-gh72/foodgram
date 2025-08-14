import { customFetch } from "@utils";

export default async function signUp({ username, password }) {
  try {
    const res = await customFetch.post(
      "/api/auth/signup",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || "Signup failed";
      throw new Error(message); // ✅ throw, don’t return
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw new Error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Something went wrong , try again later !");
    }
  }
}
