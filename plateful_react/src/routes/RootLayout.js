import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname;
                }}
            />
        </div>
    );
}

export default RootLayout;
