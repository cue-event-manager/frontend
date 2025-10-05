import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Container,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    Avatar,
    Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Logo from "../atoms/Logo";
import { useScrollPosition } from "../../shared/hooks/useScrollPosition";
import { Link, Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/authContext";

export default function Navbar() {
    const { t } = useTranslation();
    const { user, isAuthenticated, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const scrolled = useScrollPosition(10);
    const onClose = () => setOpen(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleMenuClose();
        logout();
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={scrolled ? 2 : 0}
                sx={{
                    backgroundColor: scrolled ? "background.paper" : "transparent",
                    color: scrolled ? "text.primary" : "common.white",
                    transition: "all 0.3s ease",
                }}
            >
                <Toolbar disableGutters>
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 1,
                        }}
                    >
                        {/* Logo */}
                        <Link to={ROUTES.HOME}>
                            <Logo />
                        </Link>

                        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
                            {isAuthenticated && user ? (
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
                            ) : (
                                <Button
                                    component={RouterLink}
                                    to={ROUTES.AUTH.LOGIN}
                                    variant={scrolled ? "outlined" : "contained"}
                                    color="primary"
                                >
                                    {t("auth.login.title")}
                                </Button>
                            )}
                        </Box>

                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton onClick={() => setOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="bottom"
                open={open}
                onClose={onClose}
                slotProps={{
                    paper: {
                        sx: {
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            p: 2,
                            minHeight: "70%",
                        },
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Logo />
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List>
                    {isAuthenticated && user ? (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ borderRadius: 2, px: 2, py: 1.5 }}>
                                    <ListItemIcon>
                                        <AccountCircleIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${user.firstName} ${user.lastName}`}
                                        secondary={user.email}
                                    />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={logout}
                                    sx={{
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1.5,
                                        "&:hover": { backgroundColor: "action.hover" },
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={t("auth.logout")} />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={ROUTES.AUTH.LOGIN}
                                onClick={onClose}
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1.5,
                                    "&:hover": { backgroundColor: "action.hover" },
                                }}
                            >
                                <ListItemIcon>
                                    <LoginIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={t("auth.login.title")} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </>
    );
}
