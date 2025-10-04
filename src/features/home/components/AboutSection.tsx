import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.dark }}
                        >
                            {t("about.title")}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            {t("about.description")}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {t("about.mission")}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            component="img"
                            src="/about/illustration.jpg"
                            alt="About illustration"
                            sx={{
                                width: "100%",
                                maxWidth: "480px",
                                display: "block",
                                mx: "auto",
                                borderRadius: 3,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
