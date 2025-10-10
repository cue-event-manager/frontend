import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import Logo from "@/components/atoms/Logo";
import { ADMIN_MENU_ITEMS } from "../constants/adminMenuItems.constant";

interface AdminSidebarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    onDrawerToggle: () => void;
}

export default function AdminSidebar({
    drawerWidth,
    mobileOpen,
    onDrawerToggle,
}: AdminSidebarProps) {
    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
            >
                <AdminSidebarContent />
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
                open
            >
                <AdminSidebarContent />
            </Drawer>
        </Box>
    );
}

export function AdminSidebarContent() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = ADMIN_MENU_ITEMS;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "center", paddingY: 2 }}>
                <Logo />
            </Toolbar>

            <Divider />

            <Box sx={{ flexGrow: 1 }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}
