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
    CircularProgress,
    useTheme,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import Logo from "../atoms/Logo";
import { useScrollPosition } from "../../shared/hooks/useScrollPosition";
import { Link, Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/authContext";
import UserNavMenu from "../molecules/UserNavMenu";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function Navbar() {
    const { t } = useTranslation();
    const { user, isAuthenticated } = useAuth();
    const { mutate: logout, isPending: isLoggingOut } = useLogout();
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const scrolled = useScrollPosition(10);
    const onClose = () => setOpen(false);
    const isDark = theme.palette.mode === "dark";
    const scrolledBg = alpha(theme.palette.background.paper, isDark ? 0.9 : 0.86);
    const textColor = "text.primary";

    return (
        <>
            <AppBar
                position="fixed"
                elevation={scrolled ? 2 : 0}
                sx={{
                    backgroundColor: scrolled ? scrolledBg : "transparent",
                    color: textColor,
                    transition: "background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                    boxShadow: scrolled ? `0 12px 32px ${alpha(theme.palette.common.black, isDark ? 0.35 : 0.08)}` : "none",
                    backdropFilter: scrolled ? "blur(14px)" : "none",
                }}
            >
                <Toolbar disableGutters>
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: scrolled ? 0.75 : 1.25,
                            transition: "padding 0.25s ease",
                        }}
                    >
                        <Link to={ROUTES.HOME} aria-label="Ir al inicio" style={{ display: "inline-flex" }}>
                            <Logo size={scrolled ? "compact" : "default"} />
                        </Link>

                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Button
                                component={RouterLink}
                                to={ROUTES.EVENTS}
                                color="inherit"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    px: 1.75,
                                    py: 1,
                                    fontSize: "0.95rem",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                {t("navbar.events")}
                            </Button>

                            {isAuthenticated && user ? (
                                <Box display="flex" alignItems="center" gap={2}>
                                    <UserNavMenu />
                                </Box>
                            ) : (
                                <Button
                                    component={RouterLink}
                                    to={ROUTES.AUTH.LOGIN}
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        textTransform: "none",
                                        px: 2.4,
                                        py: 1,
                                        boxShadow: scrolled ? 1 : `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    }}
                                >
                                    {t("auth.login.title")}
                                </Button>
                            )}
                        </Box>

                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                onClick={() => setOpen(true)}
                                sx={{
                                    bgcolor: scrolled ? alpha(theme.palette.action.hover, 0.6) : alpha(theme.palette.common.white, 0.14),
                                    color: textColor,
                                    "&:hover": { bgcolor: scrolled ? alpha(theme.palette.action.hover, 0.8) : alpha(theme.palette.common.white, 0.24) },
                                    transition: "background-color 0.2s ease",
                                }}
                            >
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
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            p: 2,
                            minHeight: "70%",
                            bgcolor: "background.paper",
                            color: "text.primary",
                            boxShadow: `0 -10px 30px ${alpha(theme.palette.common.black, isDark ? 0.5 : 0.12)}`,
                        },
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Logo size="compact" />
                    <IconButton onClick={onClose} sx={{ color: "text.primary" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={ROUTES.EVENTS}
                            onClick={onClose}
                            sx={{
                                borderRadius: 2,
                                px: 2,
                                py: 1.5,
                                mb: 1,
                                "&:hover": { backgroundColor: "action.hover" },
                            }}
                        >
                            <ListItemIcon>
                                <EventAvailableIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={t("navbar.events")} />
                        </ListItemButton>
                    </ListItem>

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
                                    onClick={() => {
                                        logout();
                                        onClose();
                                    }}
                                    disabled={isLoggingOut}
                                    sx={{
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1.5,
                                        "&:hover": { backgroundColor: "action.hover" },
                                    }}
                                >
                                    <ListItemIcon>
                                        {isLoggingOut ? (
                                            <CircularProgress size={20} color="primary" />
                                        ) : (
                                            <LogoutIcon color="primary" />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            isLoggingOut
                                                ? t("auth.loggingOut") || "Cerrando sesión..."
                                                : t("auth.logout")
                                        }
                                    />
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
