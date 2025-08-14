import { Header } from "@components";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
export default Home;
