import { Box, Container, Grid, Typography, Paper, useTheme, alpha } from "@mui/material";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { HomeSectionHeader } from "./HomeSectionHeader";

const stats = [
    { value: 100, suffix: "+", labelKey: "stats.eventsLabel" },
    { value: 5000, suffix: "+", labelKey: "stats.usersLabel" },
    { value: 98, suffix: "%", labelKey: "stats.satisfactionLabel" },
];

export default function StatsSection() {
    const { t } = useTranslation();
    const theme = useTheme();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, md: 14 },
                position: "relative",
                overflow: "hidden",
                background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 50%, ${theme.palette.background.default} 100%)`,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70%",
                    height: "70%",
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
                    borderRadius: "50%",
                    filter: "blur(100px)",
                    pointerEvents: "none",
                },
            }}
            ref={ref}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${alpha(theme.palette.divider, 0.02)} 1px, transparent 1px),
                                      linear-gradient(90deg, ${alpha(theme.palette.divider, 0.02)} 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 100%)",
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
                <HomeSectionHeader
                    title={t("stats.title")}
                    subtitle={t("stats.subtitle")}
                    align="center"
                    sx={{
                        animation: "fadeInUp 0.6s ease-out",
                        "@keyframes fadeInUp": {
                            from: { opacity: 0, transform: "translateY(20px)" },
                            to: { opacity: 1, transform: "translateY(0)" },
                        },
                    }}
                />

                <Grid container spacing={4} justifyContent="center">
                    {stats.map((s, i) => (
                        <Grid key={i} size={{ xs: 12, md: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 5,
                                    textAlign: "center",
                                    borderRadius: 4,
                                    position: "relative",
                                    overflow: "hidden",
                                    background: alpha(theme.palette.background.paper, 0.8),
                                    backdropFilter: "blur(10px)",
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s backwards`,
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "4px",
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        transform: "scaleX(0)",
                                        transformOrigin: "left",
                                        transition: "transform 0.4s ease",
                                    },
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                        "&::before": {
                                            transform: "scaleX(1)",
                                        },
                                        "& .stat-icon": {
                                            transform: "scale(1.1)",
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        },
                                    },
                                }}
                            >

                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    <Typography
                                        variant="h2"
                                        component="div"
                                        sx={{
                                            fontWeight: 800,
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                            mb: 2,
                                            fontSize: { xs: "3rem", md: "3.5rem" },
                                            letterSpacing: "-0.02em",
                                        }}
                                    >
                                        {inView && (
                                            <CountUp
                                                end={s.value}
                                                duration={2.5}
                                                suffix={s.suffix}
                                                separator=","
                                                useEasing={true}
                                            />
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "text.primary",
                                            fontWeight: 600,
                                            fontSize: "1.125rem",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        {t(s.labelKey)}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 16,
                                        right: 16,
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                        opacity: 0.5,
                                    }}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box
                component="svg"
                viewBox="0 0 1440 120"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "auto",
                    transform: "translateY(1px)",
                }}
            >
                <path
                    fill={theme.palette.background.default}
                    d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                ></path>
            </Box>
        </Box>
    );
}
