import { Link } from "react-router-dom";

function SignUpLoginMenu() {
  return (
    <ul className="flex flex-col justify-center items-center w-[100%] lg:flex-row">
      <p className="opacity-[0.7] ">
        To be able to comment or post your yummy foods, please &nbsp;
      </p>
      <div className="flex">
        <Link to="/login">
          <li
            style={{ fontSize: "18px", fontWeight: "600" }}
            className="cursor-pointer hover:opacity-[0.5] transition-all duration-150"
          >
            Login
          </li>
        </Link>
        &nbsp;/&nbsp;
        <Link to="/signup">
          <li
            style={{ fontSize: "18px", fontWeight: "600" }}
            className="cursor-pointer hover:opacity-[0.5] transition-all duration-150"
          >
            Signup
          </li>
        </Link>
      </div>
    </ul>
  );
}
export default SignUpLoginMenu;
