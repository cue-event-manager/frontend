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
import AvatarUserMenu from "@/components/molecules/AvatarUserMenu";
import { useTranslation } from "react-i18next";

interface AdminAppBarProps {
    drawerWidth: number;
    onMenuClick: () => void;
}

export default function AdminAppBar({ drawerWidth, onMenuClick }: AdminAppBarProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                background: theme.palette.background.paper,
                backdropFilter: "blur(8px)",
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: { xs: 2, sm: 4 },
                    py: 1.2,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            display: { xs: "none", sm: "block" },
                            color: theme.palette.primary.dark,
                        }}
                    >
                        {t("admin.nav.title")}
                    </Typography>
                </Box>

                <Box>
                    <AvatarUserMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
