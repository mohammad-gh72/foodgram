import { useAuth } from "src/features/auth/AuthContext";
import Logo from "./Logo";

import NavBar from "./NavBar";
import SignUpLoginMenu from "./SignUpLoginMenu";
import AddPostButton from "./AddPostButton";

function Header() {
  const { state: authState } = useAuth();

  return (
    <div className=" relative  w-full align-element  mt-8 mb-16 flex justify-between bg-orange-100 items-center rounded  p-4">
      <Logo />
      <NavBar />
      {!authState.user && (
        <div className="absolute bottom-[-100px]  lg:bottom-[-50px] w-full  ">
          <SignUpLoginMenu />
        </div>
      )}
      {authState.user && (
        <div className="fixed right-[65px] top-[150px]  hover:rotate-90 transition-all duration-200">
          <AddPostButton />
        </div>
      )}
    </div>
  );
}
export default Header;
