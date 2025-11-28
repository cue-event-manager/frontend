import { useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    CircularProgress,
    alpha,
    useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/authContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useThemeMode } from "@/contexts/themeContext";
import { ROUTES } from "@/routes/routes";
import { RoleConstant } from "@/domain/role/RoleConstant";

interface QuickLink {
    label: string;
    to: string;
    icon: React.ReactNode;
}

export default function UserNavMenu() {
    const { t } = useTranslation();
    const theme = useTheme();
    const { user } = useAuth();
    const { mutate: logout, isPending: isLoggingOut } = useLogout();
    const { mode, toggleMode } = useThemeMode();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    const handleToggleTheme = () => {
        toggleMode();
        handleMenuClose();
    };

    if (!user) return null;

    const role = user.role?.name as RoleConstant | undefined;
    const quickLinks: QuickLink[] = [];

    if (role === RoleConstant.ADMIN) {
        quickLinks.push({
            label: t("navbar.adminPanel", "Panel administrador"),
            to: ROUTES.ADMIN.EVENTS,
            icon: <AdminPanelSettingsIcon fontSize="small" />,
        });
    }

    if (role === RoleConstant.ORGANIZER) {
        quickLinks.push({
            label: t("navbar.organizerPanel", "Panel organizador"),
            to: ROUTES.ORGANIZER.BASE,
            icon: <DashboardCustomizeIcon fontSize="small" />,
        });
        quickLinks.push({
            label: t("navbar.organizerEvents", "Mis eventos"),
            to: ROUTES.ORGANIZER.EVENTS,
            icon: <EventAvailableIcon fontSize="small" />,
        });
    }

    return (
        <>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar
                    sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        boxShadow: `0 6px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                >
                    {user.firstName?.[0]?.toUpperCase() ?? "U"}
                </Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                disableScrollLock
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 260,
                        borderRadius: 3,
                        boxShadow: `0 18px 36px ${alpha(theme.palette.common.black, 0.14)}`,
                        overflow: "hidden",
                    },
                }}
            >
                <Box px={2.2} py={1.75}>
                    <Typography variant="subtitle2" fontWeight={700}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                </Box>

                <Divider />

                <MenuItem
                    onClick={handleMenuClose}
                    component={RouterLink}
                    to={ROUTES.PROFILE}
                    disabled={isLoggingOut}
                    sx={{ py: 1.1 }}
                >
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    {t("common.profile")}
                </MenuItem>

                <MenuItem
                    onClick={handleMenuClose}
                    component={RouterLink}
                    to={ROUTES.MY_REGISTRATIONS}
                    disabled={isLoggingOut}
                    sx={{ py: 1.1 }}
                >
                    <ListItemIcon>
                        <EventAvailableIcon fontSize="small" />
                    </ListItemIcon>
                    {t("navbar.myRegistrations")}
                </MenuItem>

                {quickLinks.length > 0 && (
                    <>
                        <Divider sx={{ my: 0.5 }} />
                        {quickLinks.map((item) => (
                            <MenuItem
                                key={item.to}
                                onClick={handleMenuClose}
                                component={RouterLink}
                                to={item.to}
                                disabled={isLoggingOut}
                                sx={{
                                    py: 1.1,
                                    fontWeight: 600,
                                    "&:hover": {
                                        color: "primary.main",
                                        "& .MuiListItemIcon-root": { color: "primary.main" },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "text.secondary" }}>{item.icon}</ListItemIcon>
                                {item.label}
                            </MenuItem>
                        ))}
                    </>
                )}

                <Divider sx={{ my: 0.5 }} />

                <MenuItem onClick={handleToggleTheme} sx={{ py: 1.1 }}>
                    <ListItemIcon>
                        {mode === "light" ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                    </ListItemIcon>
                    {mode === "light" ? t("common.darkMode") : t("common.lightMode")}
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem onClick={handleLogout} disabled={isLoggingOut} sx={{ py: 1.1, color: theme.palette.error.light }}>
                    {isLoggingOut ? (
                        <>
                            <CircularProgress size={18} sx={{ mr: 2 }} color="inherit" />
                            {t("auth.loggingOut")}
                        </>
                    ) : (
                        <>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" sx={{ color: theme.palette.error.light }} />
                            </ListItemIcon>
                            {t("auth.logout")}
                        </>
                    )}
                </MenuItem>
            </Menu>
        </>
    );
}
