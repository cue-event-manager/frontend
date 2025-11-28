import MyRegistrationsCalendar from "@/features/eventregistration/components/MyRegistrationsCalendar";
import { Box, Typography, Stack, Container } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function MyRegistrationsPage() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
                py: { xs: 4, md: 6 },
                px: { xs: 2, md: 3 },
                background: `radial-gradient(circle at 12% 18%, ${alpha(theme.palette.primary.main, 0.12)}, transparent 25%),
                             radial-gradient(circle at 88% 8%, ${alpha(theme.palette.secondary.main, 0.12)}, transparent 22%),
                             linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.96)} 0%, ${alpha(theme.palette.background.paper, 0.94)} 100%)`,
            }}
        >
            <Container maxWidth="xl" sx={{ position: "relative" }}>
                <Stack spacing={{ xs: 3, md: 4 }}>
                    {/* Page Header */}
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                                background: (theme) =>
                                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t("myRegistrations.title")}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {t("myRegistrations.description")}
                        </Typography>
                    </Box>

                    {/* Calendar Section */}
                    <Box
                        sx={{
                            p: { xs: 2, md: 3 },
                            borderRadius: 3,
                            background: alpha(theme.palette.background.paper, 0.86),
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.08)}`,
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <MyRegistrationsCalendar />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
