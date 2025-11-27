import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
    Chip,
    Stack,
    Skeleton,
    alpha,
} from "@mui/material";
import { CalendarToday, People, Assessment } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import { formatEventDate } from "@/features/event/utils/date";
import { EventStatus } from "@/domain/event/enums/EventStatus";

interface EventReportCardProps {
    event: EventWithAvailabilityResponseDto;
    onGenerateReport: (eventId: number) => void;
    isGenerating?: boolean;
}

const STATUS_COLORS: Record<EventStatus, "success" | "warning" | "default" | "error"> = {
    [EventStatus.PUBLISHED]: "success",
    [EventStatus.IN_PROGRESS]: "warning",
    [EventStatus.FINISHED]: "default",
    [EventStatus.CANCELLED]: "error",
};

const CARD_WIDTH = 300;
const CARD_MIN_HEIGHT = 260;

export default function EventReportCard({
    event,
    onGenerateReport,
    isGenerating = false,
}: EventReportCardProps) {
    const { t } = useTranslation();
    const formattedDate = formatEventDate(event.event.date, event.event.startTime);

    const registeredCount = event.availability.totalCapacity - event.availability.availableSpots;

    const statusLabel = t(`events.status.${event.event.status}`, event.event.status);
    const statusColor = STATUS_COLORS[event.event.status as EventStatus] ?? "default";

    return (
        <Card
            elevation={0}
            sx={{
                width: CARD_WIDTH,
                maxWidth: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: (theme) => `0 12px 30px ${alpha(theme.palette.common.black, 0.08)}`,
                transition: "all 0.25s ease",
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.95),
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) => `0 16px 38px ${alpha(theme.palette.common.black, 0.12)}`,
                    borderColor: "primary.main",
                },
            }}
        >
            <CardContent
                sx={{
                    flexGrow: 1,
                    pb: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    minHeight: CARD_MIN_HEIGHT,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                            sx={{
                                fontSize: { xs: "0.98rem", sm: "1.05rem" },
                                lineHeight: 1.25,
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                            }}
                        >
                            {event.event.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.event.category?.name}
                        </Typography>
                    </Box>
                    <Chip label={statusLabel} size="small" color={statusColor} sx={{ ml: 1, fontWeight: 700 }} />
                </Box>

                <Stack spacing={1}>
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

            </CardContent>

            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="contained"
                    size="medium"
                    startIcon={<Assessment />}
                    onClick={() => onGenerateReport(event.event.id)}
                    disabled={isGenerating || registeredCount === 0}
                    loading={isGenerating}
                    sx={{ py: 1.1, borderRadius: 2 }}
                >
                    {t("reports.eventCard.generateReport")}
                </Button>
            </CardActions>
        </Card>
    );
}

export function EventReportCardSkeleton() {
    return (
        <Card
            elevation={0}
            sx={{
                width: CARD_WIDTH,
                maxWidth: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: (theme) => `0 12px 30px ${alpha(theme.palette.common.black, 0.06)}`,
            }}
        >
            <CardContent sx={{ flexGrow: 1, pb: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
                    <Skeleton variant="text" width="70%" height={28} />
                    <Skeleton variant="rounded" width={64} height={24} />
                </Box>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Skeleton variant="rounded" width="100%" height={42} />
            </CardActions>
        </Card>
    );
}
