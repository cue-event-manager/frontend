import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { alpha } from "@mui/material/styles";

export default function AboutSection() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, md: 14 },
                position: "relative",
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-10%",
                    left: "-5%",
                    width: "40%",
                    height: "60%",
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-10%",
                    right: "-5%",
                    width: "40%",
                    height: "50%",
                    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 70%)`,
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                },
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 1,
                                animation: "fadeInLeft 0.8s ease-out",
                                "@keyframes fadeInLeft": {
                                    from: {
                                        opacity: 0,
                                        transform: "translateX(-30px)",
                                    },
                                    to: {
                                        opacity: 1,
                                        transform: "translateX(0)",
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: "60px",
                                    height: "4px",
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    borderRadius: "2px",
                                    mb: 3,
                                    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                                }}
                            />

                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    mb: 3,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    lineHeight: 1.2,
                                }}
                            >
                                {t("about.title")}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 3,
                                    color: theme.palette.text.primary,
                                    fontWeight: 500,
                                    lineHeight: 1.7,
                                    position: "relative",
                                    pl: 3,
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "3px",
                                        height: "80%",
                                        background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        borderRadius: "2px",
                                    },
                                }}
                            >
                                {t("about.description")}
                            </Typography>

                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: "16px",
                                    background: alpha(theme.palette.primary.main, 0.04),
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    backdropFilter: "blur(10px)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        background: alpha(theme.palette.primary.main, 0.06),
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                        transform: "translateY(-2px)",
                                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
                                    },
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        lineHeight: 1.8,
                                        fontSize: "1.05rem",
                                    }}
                                >
                                    {t("about.mission")}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 1,
                                animation: "fadeInRight 0.8s ease-out",
                                "@keyframes fadeInRight": {
                                    from: {
                                        opacity: 0,
                                        transform: "translateX(30px)",
                                    },
                                    to: {
                                        opacity: 1,
                                        transform: "translateX(0)",
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "-5%",
                                    right: "-5%",
                                    width: "80%",
                                    height: "80%",
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                    borderRadius: "24px",
                                    transform: "rotate(6deg)",
                                    zIndex: -1,
                                    filter: "blur(20px)",
                                }}
                            />

                            <Box
                                component="img"
                                src="/about/illustration.jpg"
                                alt="About illustration"
                                sx={{
                                    width: "100%",
                                    maxWidth: "540px",
                                    display: "block",
                                    mx: "auto",
                                    transition: "transform 0.4s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            />

                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "10%",
                                    right: "5%",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    opacity: 0.15,
                                    filter: "blur(20px)",
                                    animation: "float 6s ease-in-out infinite",
                                    "@keyframes float": {
                                        "0%, 100%": {
                                            transform: "translate(0, 0)",
                                        },
                                        "50%": {
                                            transform: "translate(-10px, -10px)",
                                        },
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: "15%",
                                    left: "10%",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: theme.palette.secondary.main,
                                    opacity: 0.2,
                                    filter: "blur(15px)",
                                    animation: "float 8s ease-in-out infinite reverse",
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}