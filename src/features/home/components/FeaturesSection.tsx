import {
    Box,
    Container,
    Typography,
    Paper,
    useTheme,
    Grid,
    alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EventIcon from "@mui/icons-material/Event";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";

const features = [
    {
        icon: <EventIcon fontSize="large" />,
        titleKey: "features.events.title",
        descKey: "features.events.desc",
    },
    {
        icon: <BarChartIcon fontSize="large" />,
        titleKey: "features.reports.title",
        descKey: "features.reports.desc",
    },
    {
        icon: <NotificationsIcon fontSize="large" />,
        titleKey: "features.notifications.title",
        descKey: "features.notifications.desc",
    },
];

export default function FeaturesSection() {
    const { t } = useTranslation();
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, md: 14 },
                position: "relative",
                overflow: "hidden",
                transition: "background 0.4s ease",

                background: isDark
                    ? `linear-gradient(
              180deg,
              ${alpha(theme.palette.primary.main, 0.05)} 0%,
              ${theme.palette.background.default} 100%
            )`
                    : `linear-gradient(
              180deg,
              ${alpha(theme.palette.primary.main, 0.02)} 0%,
              ${theme.palette.common.white} 100%
            )`,

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "150%",
                    height: "100%",
                    background: isDark
                        ? `radial-gradient(circle at 50% 0%, ${alpha(
                            theme.palette.primary.main,
                            0.08
                        )}, transparent 70%)`
                        : `radial-gradient(circle at 50% 0%, ${alpha(
                            theme.palette.primary.main,
                            0.02
                        )}, transparent 70%)`,
                    pointerEvents: "none",
                },
            }}
        >
            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            fontSize: { xs: "2rem", md: "2.75rem" },
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: -1,
                        }}
                    >
                        {t("features.title")}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            maxWidth: 600,
                            mx: "auto",
                            fontSize: "1.125rem",
                        }}
                    >
                        {t("features.description") ||
                            "Herramientas poderosas diseñadas para optimizar tu gestión"}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: "100%",
                                    textAlign: "center",
                                    borderRadius: 4,
                                    border: 1,
                                    borderColor: alpha(theme.palette.divider, 0.4),
                                    backgroundColor: "background.paper",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: isDark
                                            ? `0 12px 40px ${alpha(theme.palette.common.black, 0.6)}`
                                            : `0 12px 40px ${alpha(theme.palette.common.black, 0.12)}`,
                                        borderColor: "primary.main",
                                        "& .feature-icon": {
                                            transform: "scale(1.1) rotate(5deg)",
                                        },
                                        "& .gradient-bg": {
                                            opacity: 1,
                                        },
                                    },
                                }}
                            >
                                <Box
                                    className="gradient-bg"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 180,
                                        opacity: 0,
                                        transition: "opacity 0.3s ease",
                                        pointerEvents: "none",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(180deg, transparent 0%, ${theme.palette.background.paper} 100%)`,
                                        },
                                    }}
                                />

                                <Box
                                    className="feature-icon"
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 80,
                                        height: 80,
                                        borderRadius: 3,
                                        background: alpha(theme.palette.primary.main, 0.1),
                                        color: "primary.main",
                                        mb: 3,
                                        position: "relative",
                                        zIndex: 1,
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {feature.icon}
                                </Box>

                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1.5,
                                            fontSize: "1.25rem",
                                            color: "text.primary",
                                        }}
                                    >
                                        {t(feature.titleKey)}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.7,
                                            fontSize: "0.9375rem",
                                        }}
                                    >
                                        {t(feature.descKey)}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
