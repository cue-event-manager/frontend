import { Box, Drawer, useTheme } from "@mui/material";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    onDrawerToggle: () => void;
    menuItems: any[];
}

export default function Sidebar({
    drawerWidth,
    mobileOpen,
    onDrawerToggle,
    menuItems,
}: SidebarProps) {
    const theme = useTheme();

    const drawerStyles = {
        "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    };

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: "block", sm: "none" }, ...drawerStyles }}
            >
                <SidebarContent menuItems={menuItems} onItemClick={onDrawerToggle} />
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{ display: { xs: "none", sm: "block" }, ...drawerStyles }}
                open
            >
                <SidebarContent menuItems={menuItems} />
            </Drawer>
        </Box>
    );
}