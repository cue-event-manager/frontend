import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
    Chip,
    Stack,
} from "@mui/material";
import { CalendarToday, People, Assessment } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import { formatEventDate } from "@/features/event/utils/date";

interface EventReportCardProps {
    event: EventWithAvailabilityResponseDto;
    onGenerateReport: (eventId: number) => void;
    isGenerating?: boolean;
}

export default function EventReportCard({
    event,
    onGenerateReport,
    isGenerating = false,
}: EventReportCardProps) {
    const { t } = useTranslation();
    const formattedDate = formatEventDate(event.event.date, event.event.startTime);

    const registeredCount = event.availability.totalCapacity
        ? event.availability.totalCapacity - (event.availability.availableSpots || 0)
        : 0;

    return (
        <Card
            elevation={2}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem", lineHeight: 1.3 }}>
                        {event.event.name}
                    </Typography>
                    <Chip
                        label={event.event.status}
                        size="small"
                        color={event.event.status === "PUBLISHED" ? "success" : "default"}
                        sx={{ ml: 1 }}
                    />
                </Box>

                <Stack spacing={1} mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                            {formattedDate}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <People sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                            {registeredCount} {t("reports.eventCard.registrations")}
                        </Typography>
                    </Box>
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        fontSize: "0.85rem",
                        lineHeight: 1.4,
                    }}
                >
                    {event.event.description || t("reports.eventCard.noDescription")}
                </Typography>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    startIcon={<Assessment />}
                    onClick={() => onGenerateReport(event.event.id)}
                    disabled={isGenerating || registeredCount === 0}
                    loading={isGenerating}
                    sx={{ py: 1 }}
                >
                    {t("reports.eventCard.generateReport")}
                </Button>
            </CardActions>
        </Card>
    );
}
