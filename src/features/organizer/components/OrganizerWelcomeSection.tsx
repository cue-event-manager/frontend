import { Box, Typography, Avatar, useTheme, alpha } from "@mui/material";
import { useAuth } from "@/contexts/authContext";
import { useTranslation } from "react-i18next";

export default function OrganizerWelcomeSection() {
    const { user } = useAuth();
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                justifyContent: "space-between",
                textAlign: { xs: "center", sm: "left" },
                gap: { xs: 3, sm: 4, md: 6 },
                borderRadius: 4,
                p: { xs: 3, sm: 4, md: 6 },
                overflow: "hidden",
                background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.08
                )}, ${alpha(theme.palette.primary.light, 0.12)})`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.06)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.1)}`,
                    transform: "translateY(-2px)",
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at top right, ${alpha(
                        theme.palette.primary.light,
                        0.15
                    )}, transparent 60%)`,
                    pointerEvents: "none",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "flex-start" },
                    gap: { xs: 2, sm: 3 },
                    zIndex: 1,
                    flex: 1,
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: "primary.main",
                        width: { xs: 64, sm: 72, md: 80 },
                        height: { xs: 64, sm: 72, md: 80 },
                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                        fontWeight: 600,
                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.05)" },
                    }}
                >
                    {user?.firstName?.[0]?.toUpperCase() || "O"}
                </Avatar>

                <Box sx={{ mt: { xs: 1.5, sm: 0 } }}>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                            fontSize: { xs: "1.4rem", sm: "1.6rem", md: "2rem" },
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 0.5,
                        }}
                    >
                        {t("organizer.welcome.greeting", {
                            name:
                                user?.firstName || t("organizer.welcome.defaultName")
                        })}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            maxWidth: { xs: "100%", sm: "420px", md: "800px" },
                            lineHeight: 1.6,
                            mx: { xs: "auto", sm: 0 },
                        }}
                    >
                        {t("organizer.welcome.description")}
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
}
