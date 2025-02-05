import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className=" mx-auto  dark:bg-black text-gray-900 dark:text-green-400">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;  