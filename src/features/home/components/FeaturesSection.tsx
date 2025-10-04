import { Box, Container, Typography, Paper, useTheme, Grid } from "@mui/material";
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

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: theme.palette.grey[50],
            }}
        >
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 700, mb: 6 }}
                    color={theme.palette.primary.dark}
                >
                    {t("features.title")}
                </Typography>

                <Grid container spacing={2}>
                    {features.map((f, i) => (
                        <Grid key={i} size={{ xs: 12, md: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: "100%",
                                    textAlign: "center",
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    transition: "transform 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        color: theme.palette.primary.main,
                                        mb: 2,
                                    }}
                                >
                                    {f.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {t(f.titleKey)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t(f.descKey)}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
