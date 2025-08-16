import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@pages/Home";
import Landing from "@pages/Landing";
import Signup from "@pages/Signup";
import Login from "@pages/Login";
import { AuthProvider } from "./features/auth/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { PostProvider } from "./features/post/PostContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Queries are considered stale immediately, triggering refetch on any change
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ index: true, element: <Landing /> }],
  },
  { path: "signup", element: <Signup /> },
  {
    path: "login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <Toaster />
      <PostProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </AuthProvider>
      </PostProvider>
    </>
  );
}
export default App;
