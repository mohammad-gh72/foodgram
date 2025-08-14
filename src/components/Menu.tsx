import { menu } from "@utils";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <ul className="flex flex-row-reverse gap-6 capitalize font-medium ">
      {menu?.map((item) => (
        <Link
          style={{ fontSize: "14.5px" }}
          key={item.label}
          to={item.path}
          className="hover:scale-[1.1] transition-all duration-150"
        >
          <li>{item.label}</li>
        </Link>
      ))}
    </ul>
  );
}
export default Menu;
