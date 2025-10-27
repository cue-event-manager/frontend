import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    CircularProgress,
    ListItemIcon,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { ROUTES } from "@/routes/routes";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useThemeMode } from "@/contexts/themeContext"; // 👈 import your theme context

export default function AvatarUserMenu() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { mutate: logout, isPending: isLoggingOut } = useLogout();
    const { mode, toggleMode } = useThemeMode(); // 👈 access theme state

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
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

    return (
        <>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
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
            >
                <Box px={2} py={1}>
                    <Typography variant="subtitle2">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <MenuItem
                    onClick={handleMenuClose}
                    component={RouterLink}
                    to={ROUTES.PROFILE}
                    disabled={isLoggingOut}
                >
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    {t("common.profile")}
                </MenuItem>

                <MenuItem onClick={handleToggleTheme}>
                    <ListItemIcon>
                        {mode === "light" ? (
                            <DarkModeIcon fontSize="small" />
                        ) : (
                            <LightModeIcon fontSize="small" />
                        )}
                    </ListItemIcon>
                    {mode === "light"
                        ? t("common.darkMode")
                        : t("common.lightMode")}
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? (
                        <>
                            <CircularProgress size={18} sx={{ mr: 2 }} color="inherit" />
                            {t("auth.loggingOut")}
                        </>
                    ) : (
                        <>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            {t("auth.logout")}
                        </>
                    )}
                </MenuItem>
            </Menu>
        </>
    );
}
