import { Box, Container, Grid, Typography, Paper, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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
                py: { xs: 8, md: 12 },
                backgroundColor: theme.palette.grey[50],
            }}
            ref={ref}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4} justifyContent="center">
                    {stats.map((s, i) => (
                        <Grid key={i} size={{ xs: 12, md: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    transition: "transform 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    component="div"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.primary.main,
                                        mb: 1,
                                    }}
                                >
                                    {inView && (
                                        <CountUp
                                            end={s.value}
                                            duration={2}
                                            suffix={s.suffix}
                                            separator=","
                                        />
                                    )}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t(s.labelKey)}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
