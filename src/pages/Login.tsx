import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // or 'next/link' if using Next.js
import login from "src/services/login";
import { useState } from "react";
import { useAuth } from "src/features/auth/AuthContext";
function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("You successfully logged in.");
      const user = {
        userId: data.user.userId,
        username: data.user.username,
        profilePicture: data.user.profilePicture,
        jwt: data.accessToken,
      };

      dispatch({
        type: "Login",
        payload: { user, accessToken: data.accessToken },
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleUserState(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate(userData);
  }

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              onChange={handleUserState}
              value={userData.username}
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              onChange={handleUserState}
              value={userData.password}
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className={`w-full py-2 rounded-lg transition ${
              isPending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

          {/* Links under the button */}
          <div className="flex justify-between text-sm mt-2">
            <Link to="/" className="text-blue-600 hover:underline">
              ← Home
            </Link>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
