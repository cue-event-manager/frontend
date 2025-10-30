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
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {t("footer.about.title")}
                        </Typography>
                        <Typography variant="body2" color="grey.400">
                            {t("footer.about.desc")}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {t("footer.links.title")}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link
                                color="grey.400"
                                component={RouterLink}
                                to={ROUTES.HOME}
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.home")}
                            </Link>

                            <Link
                                color="grey.400"
                                component={RouterLink}
                                to="/#features"
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.features")}
                            </Link>

                            <Link
                                color="grey.400"
                                component={RouterLink}
                                to="/#contact"
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.contact")}
                            </Link>

                            <Link
                                color="grey.400"
                                component={RouterLink}
                                to={ROUTES.TERMS_AND_CONDITIONS}
                                underline="hover"
                                sx={{ width: "fit-content" }}
                            >
                                {t("footer.links.termsAndConditions")}
                            </Link>

                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {t("footer.contact.title")}
                        </Typography>
                        <Typography variant="body2" color="grey.400">
                            {t("footer.contact.email")}: info@cue.com
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
