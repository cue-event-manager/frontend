import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
    alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserNavMenu from "@/components/molecules/UserNavMenu";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ADMIN_MENU_ITEMS } from "../constants/adminMenuItems.constant";

interface AdminAppBarProps {
    drawerWidth: number;
    onMenuClick: () => void;
}

export default function AdminAppBar({ drawerWidth, onMenuClick }: AdminAppBarProps) {
    const theme = useTheme();
    const { t } = useTranslation();
    const location = useLocation();

    const getCurrentPageTitle = () => {
        const currentItem = ADMIN_MENU_ITEMS.find(
            (item) => location.pathname === item.path || location.pathname.startsWith(item.path + "/")
        );
        return currentItem?.text || t("admin.nav.title");
    };

    const pageTitle = getCurrentPageTitle();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${theme.palette.divider}`,
                boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.04)}`,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: { xs: 2, sm: 3, md: 4 },
                    minHeight: { xs: 64, sm: 72 },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
                    <IconButton
                        edge="start"
                        onClick={onMenuClick}
                        sx={{
                            display: { sm: "none" },
                            backgroundColor: "action.hover",
                            borderRadius: 2,
                            transition: "all 0.2s",
                            "&:hover": {
                                backgroundColor: "action.selected",
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: "text.primary",
                                fontSize: { xs: "1.125rem", sm: "1.5rem" },
                                letterSpacing: -0.5,
                                lineHeight: 1.2,
                            }}
                        >
                            {pageTitle}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center"}}>
                    <UserNavMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
