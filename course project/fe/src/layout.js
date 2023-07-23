import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
    return (
        <div>
            {/* self closing */}
            <NavBar />

            {/* An <Outlet> renders whatever child route is currently active,
              so you can think about this <Outlet> as a placeholder for
              the child routes we defined above. */}
            <div style={{
                display: "flex",
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;