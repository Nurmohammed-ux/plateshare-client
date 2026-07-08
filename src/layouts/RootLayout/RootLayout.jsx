import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="container mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  );
};

export default RootLayout;