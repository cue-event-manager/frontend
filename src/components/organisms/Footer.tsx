import { ROUTES } from "@/routes/routes";
import { Box, Container, Grid, Link, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.common.black,
                mt: "auto",
                boxShadow: 2
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.dark }}>
                            {t("footer.about.title")}
                        </Typography>
                        <Typography variant="body2" color="grey.400">
                            {t("footer.about.desc")}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.dark }}>
                            {t("footer.links.title")}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link
                                component={RouterLink}
                                to={ROUTES.HOME}
                                color="inherit"
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.home")}
                            </Link>

                            <Link
                                component={RouterLink}
                                to="/#features"
                                color="inherit"
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.features")}
                            </Link>

                            <Link
                                component={RouterLink}
                                to="/#contact"
                                color="inherit"
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.contact")}
                            </Link>

                            <Link
                                component={RouterLink}
                                to={ROUTES.TERMS_AND_CONDITIONS}
                                color="inherit"
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.termsAndConditions")}
                            </Link>

                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                            {t("footer.contact.title")}
                        </Typography>
                        <Typography variant="body2" color="grey.400">
                            {t("footer.contact.email")}: info@eventum.com
                        </Typography>
                        <Typography variant="body2" color="grey.400">
                            {t("footer.contact.phone")}: +57 300 000 0000
                        </Typography>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        borderTop: "1px solid",
                        borderColor: "grey.100",
                        mt: 4,
                        pt: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" color="grey.500">
                        © {new Date().getFullYear()} Eventum — {t("footer.rights")}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
