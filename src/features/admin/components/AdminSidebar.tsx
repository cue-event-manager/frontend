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
    Typography,
    Avatar,
    useTheme,
    alpha,
    Collapse,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import Logo from "@/components/atoms/Logo";
import { ADMIN_MENU_ITEMS } from "../constants/adminMenuItems.constant";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

interface AdminSidebarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    onDrawerToggle: () => void;
}


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
                <AdminSidebarContent onItemClick={onDrawerToggle} />
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{ display: { xs: "none", sm: "block" }, ...drawerStyles }}
                open
            >
                <AdminSidebarContent />
            </Drawer>
        </Box>
    );
}

interface AdminSidebarContentProps {
    onItemClick?: () => void;
}

export function AdminSidebarContent({ onItemClick }: AdminSidebarContentProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();
    const theme = useTheme();

    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (key: string) => {
        setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        onItemClick?.();
    };

    const isActive = (path?: string) =>
        !!path && (location.pathname === path || location.pathname.startsWith(path + "/"));

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "background.paper",
            }}
        >
            <Toolbar sx={{ justifyContent: "center", py: 3 }}>
                <Logo />
            </Toolbar>

            <Divider sx={{ mx: 2 }} />

            {user && (
                <Box sx={{ px: 2, py: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "primary.main",
                                fontSize: "1rem",
                                fontWeight: 600,
                            }}
                        >
                            {user.firstName?.charAt(0).toUpperCase() || "A"}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" fontWeight={600} noWrap>
                                {user.firstName}
                            </Typography>
                            <Typography variant="caption" noWrap sx={{ color: "text.secondary" }}>
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}

            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2 }}>
                <List sx={{ py: 1 }}>
                    {ADMIN_MENU_ITEMS.map((item) => {
                        const active = isActive(item.path);
                        const hasChildren = item.children?.length;
                        const open = openGroups[item.text] || false;

                        return (
                            <Box key={item.text}>
                                <ListItem disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        onClick={
                                            hasChildren
                                                ? () => toggleGroup(item.text)
                                                : () => item.path && handleNavigation(item.path)
                                        }
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.25,
                                            px: 2,
                                            backgroundColor: active
                                                ? alpha(theme.palette.primary.main, 0.12)
                                                : "transparent",
                                            "&:hover": {
                                                backgroundColor: active
                                                    ? alpha(theme.palette.primary.main, 0.16)
                                                    : "action.hover",
                                                transform: "translateX(4px)",

                                                transition:'ease-in'
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 40,
                                                color: active ? "primary.main" : "text.secondary",
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontSize: "0.875rem",
                                                fontWeight: active ? 600 : 500,
                                                color: active ? "primary.main" : "text.primary",
                                            }}
                                        />
                                        {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
                                    </ListItemButton>
                                </ListItem>

                                {hasChildren && (
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ pl: 4 }}>
                                            {item.children!.map((child) => {
                                                const childActive = isActive(child.path);
                                                return (
                                                    <ListItem key={child.text} disablePadding sx={{ mb: 0.5 }}>
                                                        <ListItemButton
                                                            onClick={() => child.path && handleNavigation(child.path)}
                                                            sx={{
                                                                borderRadius: 2,
                                                                py: 1,
                                                                px: 2,
                                                                backgroundColor: childActive
                                                                    ? alpha(theme.palette.primary.main, 0.12)
                                                                    : "transparent",
                                                                "&:hover": {
                                                                    backgroundColor: childActive
                                                                        ? alpha(theme.palette.primary.main, 0.16)
                                                                        : "action.hover",
                                                                    transform: "translateX(4px)",
                                                                },
                                                            }}
                                                        >
                                                            <ListItemIcon
                                                                sx={{
                                                                    minWidth: 36,
                                                                    color: childActive
                                                                        ? "primary.main"
                                                                        : "text.secondary",
                                                                }}
                                                            >
                                                                {child.icon}
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={child.text}
                                                                primaryTypographyProps={{
                                                                    fontSize: "0.85rem",
                                                                    fontWeight: childActive ? 600 : 500,
                                                                    color: childActive
                                                                        ? "primary.main"
                                                                        : "text.primary",
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Collapse>
                                )}
                            </Box>
                        );
                    })}
                </List>
            </Box>

            <Box sx={{ px: 2, pb: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <ListItemButton
                    onClick={logout}
                    sx={{
                        borderRadius: 2,
                        py: 1.25,
                        px: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                            backgroundColor: alpha(theme.palette.error.main, 0.08),
                            borderColor: "error.main",
                            transform: "translateX(4px)",
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <LogoutIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Cerrar sesión"
                        primaryTypographyProps={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "error.main",
                        }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    );
}