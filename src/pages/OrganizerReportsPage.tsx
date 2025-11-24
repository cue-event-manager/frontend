import { Box, Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import MyEventsReportForm from "@/features/report/components/MyEventsReportForm";
import EventRegistrationsReportForm from "@/features/report/components/EventRegistrationsReportForm";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";

export default function OrganizerReportsPage() {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                p: { xs: 2, md: 4 },
            }}
        >
            <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t("reports.title")}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {t("reports.description")}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card elevation={2}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <AssessmentIcon color="primary" sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {t("reports.myEvents.title")}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t("reports.myEvents.description")}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                            <MyEventsReportForm />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={2}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {t("reports.eventRegistrations.title")}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t("reports.eventRegistrations.description")}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                            <EventRegistrationsReportForm />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
