import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // or 'next/link' if using Next.js
import signUp from "src/services/signUp";

function Signup() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("You have successfully signed up.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleUserState(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value, // dynamic key: "username" or "password"
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate(userData);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
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
            type="submit"
            disabled={isPending}
            className={`w-full py-2 rounded-lg transition ${
              isPending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>

          {/* Links under the button */}
          <div className="flex justify-between text-sm mt-2">
            <Link to="/" className="text-blue-600 hover:underline">
              ← Home
            </Link>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
