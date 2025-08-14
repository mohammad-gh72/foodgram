import { createContext, useContext, useEffect, useReducer } from "react";
import refreshToken from "src/services/refrechToken";

const AuthContext = createContext(undefined);

function saveUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function clearUserFromLocalStorage() {
  localStorage.removeItem("user");
}

const defaultState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "Login":
      saveUserToLocalStorage({
        userId: action.payload.user.userId,
        username: action.payload.user.username,
        profilePicture: action.payload.user.profilePicture,
      });
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "Logout":
      clearUserFromLocalStorage();
      return {
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, defaultState);

  useEffect(() => {
    if (!state.accessToken && state.user) {
      refreshToken(state, dispatch);
    }
  }, [state]);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
