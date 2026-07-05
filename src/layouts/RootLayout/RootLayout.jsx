import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="container mx-auto">
        <Navbar />
        <Outlet />
    </div>
  );
};

export default RootLayout;