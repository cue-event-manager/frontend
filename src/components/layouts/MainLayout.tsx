import { Box, Fade } from "@mui/material";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useNavbarHeight from "@/shared/hooks/useNavbarHeight";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);
    return null;
}

export default function MainLayout() {
    const navbarHeight = useNavbarHeight();

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <ScrollToTop />

            <Navbar />

            <Box sx={{ height: navbarHeight }} />

            <Fade in timeout={400}>
                <Box
                    component="main"
                    flexGrow={1}
                >
                    <Outlet />
                </Box>
            </Fade>

            <Footer />
        </Box>
    );
}
