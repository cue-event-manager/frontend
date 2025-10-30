// SidebarContent.tsx
import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Avatar,
    Typography,
    Collapse,
    alpha,
    useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/contexts/authContext";
import Logo from "@/components/atoms/Logo";
import { useState } from "react";

interface SidebarContentProps {
    menuItems: any[];
    onItemClick?: () => void;
}

export default function SidebarContent({ menuItems, onItemClick }: SidebarContentProps) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (key: string) =>
        setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

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
                        <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
                            {user.firstName?.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                overflow: "hidden",
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                fontWeight={600}
                                noWrap
                                sx={{ lineHeight: 1.2 }}
                            >
                                {user.firstName}
                            </Typography>

                            <Typography
                                variant="caption"
                                noWrap
                                sx={{
                                    color: "text.secondary",
                                    display: "block",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    maxWidth: "100%",
                                }}
                            >
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2 }}>
                <List sx={{ py: 1 }}>
                    {menuItems.map((item) => {
                        const active = isActive(item.path);
                        const hasChildren = !!item.children?.length;
                        const open = openGroups[item.text] || false;

                        return (
                            <Box key={item.text}>
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
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: active ? "primary.main" : "text.secondary" }}>
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

                                {hasChildren && (
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ pl: 4 }}>
                                            {item.children.map((child: any) => (
                                                <ListItemButton
                                                    key={child.text}
                                                    onClick={() => handleNavigation(child.path)}
                                                    sx={{
                                                        borderRadius: 2,
                                                        py: 1,
                                                        px: 2,
                                                        backgroundColor: isActive(child.path)
                                                            ? alpha(theme.palette.primary.main, 0.12)
                                                            : "transparent",
                                                    }}
                                                >
                                                    <ListItemIcon sx={{ color: isActive(child.path) ? "primary.main" : "text.secondary" }}>
                                                        {child.icon}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={child.text}
                                                        primaryTypographyProps={{
                                                            fontSize: "0.85rem",
                                                            fontWeight: isActive(child.path) ? 600 : 500,
                                                            color: isActive(child.path) ? "primary.main" : "text.primary",
                                                        }}
                                                    />
                                                </ListItemButton>
                                            ))}
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
                <ListItemButton onClick={logout}>
                    <ListItemIcon>
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
