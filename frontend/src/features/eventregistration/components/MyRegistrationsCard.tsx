import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    CircularProgress,
    Alert,
    Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMyEventRegistrations } from "../hooks/useMyEventRegistrations";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function MyRegistrationsCard() {
    const { t } = useTranslation();
    const { data: registrations, isLoading, error } = useMyEventRegistrations();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                {t("eventRegistration.messages.loadRegistrationsError")}
            </Alert>
        );
    }

    if (!registrations || registrations.length === 0) {
        return (
            <Alert severity="info">
                {t("eventRegistration.messages.noRegistrations")}
            </Alert>
        );
    }

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {t("eventRegistration.myRegistrations")}
            </Typography>

            <Grid container spacing={2}>
                {registrations.map((registration) => (
                    <Grid item xs={12} md={6} key={registration.id}>
                        <Card
                            variant="outlined"
                            sx={{
                                transition: "box-shadow 0.3s",
                                "&:hover": {
                                    boxShadow: 3,
                                },
                            }}
                        >
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <Typography variant="h6" component="div">
                                        {registration.event.name}
                                    </Typography>
                                    <Chip
                                        label={t(`eventRegistration.status.${registration.status}`)}
                                        color="success"
                                        size="small"
                                    />
                                </Box>

                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <EventIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {format(parseISO(registration.event.date), "PPP", {
                                            locale: es,
                                        })}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <AccessTimeIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {registration.event.startTime} - {registration.event.endTime}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <LocationOnIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {t("eventRegistration.eventDetails.modality")}:{" "}
                                        {registration.event.modalityName}
                                    </Typography>
                                </Box>

                                <Typography variant="caption" color="text.secondary" display="block" mt={2}>
                                    {t("eventRegistration.registeredOn")}:{" "}
                                    {format(parseISO(registration.registrationDate), "PPp", {
                                        locale: es,
                                    })}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
