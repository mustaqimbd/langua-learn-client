import { Outlet } from "react-router-dom";
import Navbar from "../components/home/navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-341px)] mx-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;