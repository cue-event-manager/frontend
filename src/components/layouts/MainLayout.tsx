import { Box } from "@mui/material";
import Navbar from "../organisms/Navbar";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar />

            <Box component="main" flexGrow={1}>
                <Outlet />
            </Box>
        </Box>
    );
}
