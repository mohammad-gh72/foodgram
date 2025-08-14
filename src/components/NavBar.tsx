import { useAuth } from "src/features/auth/AuthContext";
import Menue from "./Menu";
import ProfileMenu from "./ProfileMenu";

function NavBar() {
  const { state } = useAuth();
  return (
    <>
      <div className="flex flex-row-reverse  w-[100%]  items-center gap-4  z-50">
        {state.user && <ProfileMenu />}
        <Menue />
      </div>
    </>
  );
}
export default NavBar;
