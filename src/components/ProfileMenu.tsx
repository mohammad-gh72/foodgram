import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "src/features/auth/AuthContext";
import { usePost } from "src/features/post/PostContext";
import logout from "src/services/logout";

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu() {
    setIsOpen(true);
  }
  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <div className="relative opacity-[0.9]   w-[35px] cursor-pointer hover:scale-[1.1] hover:rotate-1 transition-all duration-150">
      <img
        src="./avatar.png"
        alt="avatar"
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      />
      <div
        className="absolute  lg:left-[-135px] left-[-170px] "
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      >
        {isOpen && <ProfileSubMenue />}
      </div>
    </div>
  );
}
export default ProfileMenu;

function ProfileSubMenue() {
  const { state, dispatch: authDispatch } = useAuth();
  const { dispatch: postDispatch } = usePost();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const user = state.user;

  async function serverLogout() {
    const res = await logout();
    if (res === 204) {
      setIsLoggedOut(true);
      authDispatch({ type: "Logout" });
    } else {
      toast.error("Something went wrong!");
    }
  }

  return (
    <ul className="bg-white p-4 w-[200px] rounded-2xl flex flex-col gap-4 z-[9999]">
      <li
        style={{ fontSize: "10px" }}
        className="bg-amber-100 p-2 rounded-[5px] "
      >
        Welcome {user?.username}
      </li>
      {!isLoggedOut ? (
        <li
          className="hover:opacity-[0.5]"
          onClick={() => {
            postDispatch({ type: "CloseAddPostModal" });
            serverLogout();
          }}
        >
          Logout
        </li>
      ) : (
        <li className="opacity-[0.3] animate-pulse">Logging Out...</li>
      )}
    </ul>
  );
}
