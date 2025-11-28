import { Card, CardContent, Typography, Box, Chip, Button, Skeleton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { EventRegistration } from "@/domain/eventregistration/EventRegistration";
import { EventRegistrationStatus } from "@/domain/eventregistration/enums/EventRegistrationStatus";
import { ROUTES } from "@/routes/routes";
import { getEventImageUrl } from "@/features/event/constants/media.constant";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { EventStatus } from "@/domain/event/enums/EventStatus";

interface MyRegistrationCardProps {
    registration: EventRegistration;
    onCancelRegistration?: (registrationId: number) => void;
}

const STATUS_COLORS: Record<EventRegistrationStatus, { bg: string; text: string }> = {
    [EventRegistrationStatus.REGISTERED]: { bg: "#4CAF50", text: "#fff" },
    [EventRegistrationStatus.CANCELLED]: { bg: "#F44336", text: "#fff" },
    [EventRegistrationStatus.CHECKED_IN]: { bg: "#2196F3", text: "#fff" },
    [EventRegistrationStatus.NO_SHOW]: { bg: "#FF9800", text: "#fff" },
};

export default function MyRegistrationCard({
    registration,
    onCancelRegistration,
}: MyRegistrationCardProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { event, status, registrationDate, cancellationDate, attendanceDate } = registration;

    const statusConfig = STATUS_COLORS[status];
    const canCancel = event.status == EventStatus.PUBLISHED;

    const formatDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), "PPP", { locale: es });
        } catch {
            return dateString;
        }
    };

    const formatDateTime = (dateString: string) => {
        try {
            return format(parseISO(dateString), "PPP 'a las' p", { locale: es });
        } catch {
            return dateString;
        }
    };

    const handleViewEvent = () => {
        navigate(ROUTES.EVENT_DETAIL(event.id));
    };

    const handleCancelRegistration = () => {
        if (onCancelRegistration) {
            onCancelRegistration(registration.id);
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                minHeight: { xs: "auto", sm: 240 },
                maxWidth: "100%",
                border: "1px solid",
                borderColor: (theme) =>
                    theme.palette.mode === "dark"
                        ? alpha(theme.palette.common.white, 0.08)
                        : theme.palette.divider,
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.25s ease",
                boxShadow: "0 12px 24px rgba(0,0,0,0.02)",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 12px 24px rgba(0,0,0,0.4)"
                            : "0 4px 20px rgba(0,0,0,0.08)",
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                    background: (theme) =>
                        theme.palette.mode === "dark"
                            ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)}, transparent)`
                            : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)}, transparent)`,
                },
            }}
        >
            <Box
                component="img"
                src={getEventImageUrl(event.imagePath)}
                alt={event.name}
                sx={{
                    width: { xs: "100%", sm: 260 },
                    height: { xs: 200, sm: "100%" },
                    objectFit: "cover",
                    flexShrink: 0,
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <CardContent
                    sx={{
                        flex: 1,
                        p: { xs: 2, sm: 2.75 },
                        pb: { xs: 1.5, sm: 2.25 },
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.75,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "1.05rem", sm: "1.15rem" },
                                    lineHeight: 1.3,
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                    minHeight: "2.6em",
                                }}
                            >
                                {event.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                                {event.category.name}
                            </Typography>
                        </Box>
                        <Chip
                            label={t(`myRegistrations.status.${status}`)}
                            size="small"
                            sx={{
                                bgcolor: (theme) => alpha(statusConfig.bg, theme.palette.mode === "dark" ? 0.2 : 0.12),
                                color: statusConfig.bg,
                                fontWeight: 700,
                                fontSize: "0.72rem",
                                height: 26,
                                flexShrink: 0,
                                borderRadius: 1.5,
                                border: (theme) => `1px solid ${alpha(statusConfig.bg, 0.4)}`,
                                boxShadow: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? `0 4px 12px ${alpha(statusConfig.bg, 0.18)}`
                                        : `0 6px 14px ${alpha(statusConfig.bg, 0.16)}`,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                p: 1,
                                borderRadius: 1.5,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.05),
                            }}
                        >
                            <EventIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
                                {event.startDate ? formatDate(event.startDate) : formatDate(event.date)}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                p: 1,
                                borderRadius: 1.5,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.05),
                            }}
                        >
                            <AccessTimeIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
                                {event.startTime} - {event.endTime}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fit, minmax(240px, 1fr))" },
                            gap: 1,
                            mt: "auto",
                            p: 1.25,
                            borderRadius: 1.5,
                            border: (theme) => `1px dashed ${alpha(theme.palette.primary.main, 0.25)}`,
                            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.04),
                        }}
                    >
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                            {t("myRegistrations.registeredOn")}: {registrationDate ? formatDateTime(registrationDate) : "-"}
                        </Typography>
                        {cancellationDate && (
                            <Typography
                                variant="caption"
                                color="error"
                                sx={{ fontSize: "0.8rem", fontWeight: 600 }}
                            >
                                {t("myRegistrations.cancelledOn")}: {formatDateTime(cancellationDate)}
                            </Typography>
                        )}
                        {attendanceDate && (
                            <Typography
                                variant="caption"
                                color="primary"
                                sx={{ fontSize: "0.8rem", fontWeight: 600 }}
                            >
                                {t("myRegistrations.attendedOn")}: {formatDateTime(attendanceDate)}
                            </Typography>
                        )}
                    </Box>
                </CardContent>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                        gap: 1,
                        p: { xs: 2, sm: 2.75 },
                        pt: 0,
                        borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={handleViewEvent}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 1.25,
                            minHeight: 44,
                            gap: 0.75,
                            flex: 1,
                            minWidth: 160,
                        }}
                    >
                        <OpenInNewIcon sx={{ fontSize: 18 }} />
                        {t("myRegistrations.viewEvent")}
                    </Button>
                    {canCancel && (
                        <Button
                            variant="outlined"
                            size="medium"
                            color="error"
                            startIcon={<CancelIcon sx={{ fontSize: 16 }} />}
                            onClick={handleCancelRegistration}
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                borderRadius: 1.25,
                                minHeight: 44,
                                flex: 1,
                                minWidth: 160,
                            }}
                        >
                            {t("myRegistrations.cancelRegistration")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    );
}

export function MyRegistrationCardSkeleton() {
    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                minHeight: { xs: "auto", sm: 240 },
                maxWidth: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <Skeleton
                variant="rectangular"
                sx={{
                    width: { xs: "100%", sm: 260 },
                    height: { xs: 200, sm: "100%" },
                    flexShrink: 0,
                }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 2.75, gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Skeleton variant="text" width="65%" height={30} />
                    <Skeleton variant="rounded" width={90} height={26} sx={{ borderRadius: 1.5 }} />
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1 }}>
                    <Skeleton variant="rounded" height={44} />
                    <Skeleton variant="rounded" height={44} />
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                        gap: 1,
                        mt: "auto",
                    }}
                >
                    <Skeleton variant="rounded" height={36} />
                    <Skeleton variant="rounded" height={36} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                        gap: 1,
                        pt: 1.5,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Skeleton variant="rounded" height={44} sx={{ flex: 1, minWidth: 160 }} />
                    <Skeleton variant="rounded" height={44} sx={{ flex: 1, minWidth: 160 }} />
                </Box>
            </Box>
        </Card>
    );
}
