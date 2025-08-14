import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { state } = useAuth();

  if (state.isLoggedin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;
