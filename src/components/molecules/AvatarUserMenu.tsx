import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { ROUTES } from "@/routes/routes";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function AvatarUserMenu() {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleMenuClose();
        logout();
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
                <MenuItem onClick={handleMenuClose} component={RouterLink} to={ROUTES.HOME}>
                    <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} /> {t("common.profile")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> {t("auth.logout")}
                </MenuItem>
            </Menu>
        </>
    );
}