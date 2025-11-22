import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../organisms/Sidebar";

interface BaseLayoutProps {
    drawerWidth?: number;
    menuItems: any[];
    AppBarComponent: React.ComponentType<{ drawerWidth: number; onMenuClick: () => void }>;
}

export default function BaseLayout({
    drawerWidth = 280,
    menuItems,
    AppBarComponent,
}: BaseLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarComponent drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle} />
            <Sidebar
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                onDrawerToggle={handleDrawerToggle}
                menuItems={menuItems}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 6,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                    bgcolor: "background.default",
                    minHeight: "100vh",
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
