import { Box, Button, Container, Stack, Typography, alpha, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/routes/routes";

export default function NotFoundPage() {
    const { t } = useTranslation();
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const tips = [
        t("errors.notFound.tips.checkUrl", "Verifica que la dirección web esté bien escrita."),
        t("errors.notFound.tips.backHome", "Regresa al inicio para continuar navegando."),
        t("errors.notFound.tips.events", "Explora los próximos eventos disponibles."),
        t("errors.notFound.tips.support", "Si necesitas ayuda, contacta al equipo de soporte."),
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.15)}, transparent 35%),
                                      radial-gradient(circle at 80% 10%, ${alpha(theme.palette.secondary.main, 0.12)}, transparent 30%),
                                      radial-gradient(circle at 70% 80%, ${alpha(theme.palette.primary.main, 0.08)}, transparent 40%)`,
                    opacity: isDark ? 0.5 : 0.7,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${alpha(theme.palette.divider, 0.04)} 1px, transparent 1px),
                                      linear-gradient(90deg, ${alpha(theme.palette.divider, 0.04)} 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
                <Stack spacing={{ xs: 4, md: 5 }} alignItems="center" textAlign="center">
                
                    <Stack spacing={2} alignItems="center" maxWidth={740}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: "2.25rem", md: "3rem" },
                                lineHeight: 1.1,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {t("errors.notFound.title")}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}
                        >
                            {t(
                                "errors.notFound.subtitle",
                            )}
                        </Typography>
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Button
                            component={RouterLink}
                            to={ROUTES.HOME}
                            variant="contained"
                            size="large"
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 10,
                                boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                            }}
                        >
                            {t("errors.notFound.goHome", "Ir al inicio")}
                        </Button>
                        <Button
                            component={RouterLink}
                            to={ROUTES.EVENTS}
                            variant="outlined"
                            size="large"
                            color="primary"
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 10,
                                borderColor: alpha(theme.palette.primary.main, 0.4),
                                "&:hover": { borderColor: theme.palette.primary.main },
                            }}
                        >
                            {t("errors.notFound.exploreEvents", "Explorar eventos")}
                        </Button>
                    </Stack>

                </Stack>
            </Container>
        </Box>
    );
}
