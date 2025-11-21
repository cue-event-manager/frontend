import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Chip, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAllEvents } from "@/features/event/hooks/useAllEvents";
import EventRegistrationButton from "@/features/eventregistration/components/EventRegistrationButton";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { EventStatus } from "@/domain/event/enums/EventStatus";

export default function EventsPage() {
    const { t } = useTranslation();
    const { data: events, isLoading } = useAllEvents();

    // Filter only published events
    const publishedEvents = events?.filter((event) => event.status === EventStatus.PUBLISHED) ?? [];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Eventos Disponibles
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Explora los eventos publicados y regístrate para participar
                </Typography>
            </Box>

            {isLoading && (
                <Typography variant="body1" color="text.secondary">
                    {t("common.status.loading")}
                </Typography>
            )}

            {!isLoading && publishedEvents.length === 0 && (
                <Typography variant="body1" color="text.secondary">
                    No hay eventos disponibles en este momento.
                </Typography>
            )}

            <Grid container spacing={3}>
                {publishedEvents.map((event) => (
                    <Grid item xs={12} md={6} key={event.id}>
                        <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            {event.imagePath && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={event.imagePath}
                                    alt={event.name}
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {event.name}
                                    </Typography>
                                    <Chip
                                        label={event.categoryName}
                                        color="primary"
                                        size="small"
                                    />
                                </Box>

                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {event.description}
                                </Typography>

                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <EventIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {format(parseISO(event.date), "PPP", { locale: es })}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <AccessTimeIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {event.startTime} - {event.endTime}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <LocationOnIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {event.modalityName}
                                    </Typography>
                                </Box>

                                {event.cost > 0 && (
                                    <Typography variant="body2" fontWeight="bold" color="primary" mb={2}>
                                        Costo: ${event.cost.toLocaleString()}
                                    </Typography>
                                )}

                                <EventRegistrationButton eventId={event.id} eventName={event.name} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
