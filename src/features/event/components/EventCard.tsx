import {
    Card,
    CardContent,
    CardActions,
    CardActionArea,
    Typography,
    Box,
    Stack,
    useTheme,
    Button,
    Skeleton,
    Chip,
    Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { CalendarToday, VideoCall, People } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { Event } from "@/domain/event/Event";
import type { EventAvailability } from "@/domain/event/EventAvailability";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import { formatEventDate } from "@/features/event/utils/date";
import { useAuth } from "@/contexts/authContext";
import { RoleConstant } from "@/domain/role/RoleConstant";
import { useModalState } from "@/features/user/hooks/useModalState";
import UpdateEventFormModal from "./UpdateEventForm/UpdateEventFormModal";
import { getEventImageUrl } from "@/features/event/constants/media.constant";
import { ROUTES } from "@/routes/routes";
import { useRegisterToEvent } from "@/features/eventregistration/hooks/useRegisterToEvent";
import { useCancelEventRegistration } from "@/features/eventregistration/hooks/useCancelEventRegistration";

interface EventCardActionContext {
    event: Event;
    availability: EventAvailability;
    actions: EventCardActionHandlers;
    loading: {
        register: boolean;
        cancel: boolean;
    };
}

interface EventCardActionHandlers {
    view: () => void;
    edit: () => void;
    delete: () => void;
    register: () => void;
    cancel: () => void;
}

type EventCardActionRenderer = (context: EventCardActionContext) => ReactNode;

interface EventCardProps {
    data: EventWithAvailabilityResponseDto;
    renderActions?: EventCardActionRenderer;
    size?: "default" | "small";
}

const defaultActionRenderer: EventCardActionRenderer = (context) => (
    <RoleBasedEventActions {...context} />
);

const CARD_SIZE_STYLES = {
    default: {
        width: 300,
        minHeight: 400,
        imageHeight: 130,
        contentMinHeight: 210,
    },
    small: {
        width: 270,
        minHeight: 320,
        imageHeight: 115,
        contentMinHeight: 190,
    },
} as const;

export function EventCard({ data, renderActions = defaultActionRenderer, size = "default" }: EventCardProps) {
    const { event, availability } = data;
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const { handlers, dialogs, loading } = useEventActionManager(event);
    const isRecent = isEventRecent(event.createdAt);
    const sizeStyles = CARD_SIZE_STYLES[size];

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: isDarkMode
                        ? alpha(theme.palette.common.white, 0.08)
                        : theme.palette.divider,
                    transition: "0.25s ease",
                    "&:hover": {
                        boxShadow: isDarkMode
                            ? "0 18px 35px rgba(0,0,0,0.65)"
                            : "0 4px 22px rgba(0,0,0,0.08)",
                        transform: "translateY(-2px)",
                    },
                    bgcolor: theme.palette.background.paper,
                    width: "100%",
                    maxWidth: { xs: "100%", sm: sizeStyles.width },
                    minHeight: { xs: sizeStyles.minHeight - 20, sm: sizeStyles.minHeight },
                    height: "100%",
                }}
            >
                <CardActionArea
                    onClick={handlers.view}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        flexGrow: 1,
                    }}
                >
                    <EventCardImage
                        event={event}
                        isRecent={isRecent}
                        imageHeight={sizeStyles.imageHeight}
                    />

                    <CardContent
                        sx={{
                            p: { xs: 2, sm: 2.4 },
                            pb: { xs: 1.2, sm: 1.6 },
                            display: "flex",
                            flexDirection: "column",
                            gap: { xs: 0.8, sm: 1 },
                            flexGrow: 1,
                            width: "100%",
                            minHeight: { xs: sizeStyles.contentMinHeight - 10, sm: sizeStyles.contentMinHeight },
                        }}
                    >
                        <EventCardHeader event={event} />
                        <EventCardMetaInfo event={event} availability={availability} />
                    </CardContent>
                </CardActionArea>
                <EventCardFooter actions={renderActions({ event, availability, actions: handlers, loading })} />
            </Card>
            {dialogs}
        </>
    );
}

export function EventCardSkeleton({ size = "default" }: { size?: "default" | "small" }) {
    const sizeStyles = CARD_SIZE_STYLES[size];
    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                width: sizeStyles.width,
                maxWidth: "100%",
                minHeight: { xs: sizeStyles.minHeight - 40, sm: sizeStyles.minHeight - 20 },
                height: "100%",
                mx: "auto",
            }}
        >
            <Skeleton
                variant="rectangular"
                width="100%"
                sx={{ height: { xs: sizeStyles.imageHeight, sm: sizeStyles.imageHeight + 20 } }}
            />
            <CardContent sx={{ p: 2.4, pb: 1.6, display: "flex", flexDirection: "column", gap: 1 }}>
                <Skeleton variant="text" width="70%" height={28} />
                <Skeleton variant="text" width="45%" />
                <Skeleton variant="rectangular" height={54} sx={{ borderRadius: 2 }} />
                <Stack direction="row" spacing={2} mt={1}>
                    <Skeleton variant="text" width="30%" />
                    <Skeleton variant="text" width="30%" />
                </Stack>
            </CardContent>
            <CardActions sx={{ px: 2.4, pb: 2.4 }}>
                <Skeleton variant="rounded" width="100%" height={40} />
            </CardActions>
        </Card>
    );
}

function useEventActionManager(event: Event) {
    const updateModal = useModalState<Event>();
    const navigate = useNavigate();
    const { mutateAsync: registerMutation, isPending: isRegistering } = useRegisterToEvent();
    const { mutateAsync: cancelMutation, isPending: isCancelling } = useCancelEventRegistration();

    const handleEdit = useCallback(() => {
        updateModal.openModal(event);
    }, [event, updateModal]);

    const handleView = useCallback(() => {
        navigate(ROUTES.EVENT_DETAIL(event.id));
    }, [event.id, navigate]);

    const handlers: EventCardActionHandlers = {
        view: handleView,
        edit: handleEdit,
        delete: () => console.log("Delete", event.id),
        register: () => registerMutation({ eventId: event.id }),
        cancel: () => cancelMutation({ id: event.id }),
    };

    const dialogs = (
        <UpdateEventFormModal
            open={updateModal.isOpen}
            event={updateModal.data ?? null}
            onClose={updateModal.closeModal}
        />
    );

    return { handlers, dialogs, loading: { register: isRegistering, cancel: isCancelling } };
}

function EventCardImage({ event, isRecent, imageHeight }: { event: Event; isRecent: boolean; imageHeight: number }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const imageUrl = getEventImageUrl(event.imagePath);

    return (
        <Box
            sx={{
                position: "relative",
                height: { xs: imageHeight - 10, sm: imageHeight },
            }}
        >
            <Box
                component="img"
                src={imageUrl}
                alt={event.name}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />

            <ModalityChip modality={event.modality} />
            {isRecent && <RecentBadge />}

            {event.virtualMeetingLink && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        bgcolor: isDark ? alpha(theme.palette.background.paper, 0.9) : "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isDark ? "0 8px 18px rgba(0,0,0,0.5)" : 1,
                    }}
                >
                    <VideoCall sx={{ fontSize: 20, color: "primary.main" }} />
                </Box>
            )}
        </Box>
    );
}

function ModalityChip({ modality }: { modality: Event["modality"] }) {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 12,
                left: 12,
                px: 1.2,
                py: 0.5,
                bgcolor: "rgba(0, 190, 160, 1)",
                color: "white",
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "0.7rem",
            }}
        >
            {modality.name}
        </Box>
    );
}

function RecentBadge() {
    const { t } = useTranslation();
    return (
        <Chip
            size="small"
            color="primary"
            label={t("events.card.recent", "Nuevo")}
            sx={{
                position: "absolute",
                top: 12,
                right: 12,
                fontWeight: 700,
                borderRadius: 2,
                backdropFilter: "blur(6px)",
            }}
        />
    );
}

function isEventRecent(createdAt?: string) {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    if (Number.isNaN(created.getTime())) return false;
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const days = diffMs / (1000 * 60 * 60 * 24);
    return days <= 7;
}

function EventCardHeader({ event }: { event: Event }) {

    return (
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
            <Tooltip title={event.name} disableInteractive>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        fontSize: { xs: "0.98rem", sm: "1.05rem" },
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        minHeight: "2.4em",
                        width: "100%",
                    }}
                >
                    {event.name}
                </Typography>
            </Tooltip>
        </Box>
    );
}


function EventCardMetaInfo({
    event,
    availability,
}: {
    event: Event;
    availability: EventAvailability;
}) {
    const { t } = useTranslation();
    const formattedDate = formatEventDate(event.date, event.startTime);

    const total = availability.totalCapacity ?? event.capacity ?? 0;
    const available = Math.max(availability.availableSpots ?? 0, 0);

    const capacityLabel =
        total > 0
            ? t("events.card.capacitySummary", { available, total })
            : t("events.card.spotsAvailable", { count: available });

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography sx={{ color: "primary.main", fontSize: { xs: "0.8rem", sm: "0.8rem" }, fontWeight: 500 }}>
                {formattedDate}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
                <People sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                    {capacityLabel}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <CalendarToday sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.78rem" }}>
                    {event.category?.name}
                </Typography>
            </Stack>
        </Box>
    );
}



function EventCardFooter({ actions }: { actions?: ReactNode }) {
    if (!actions) return null;

    return (
        <CardActions
            sx={{
                px: { xs: 2, sm: 2.4 },
                py: { xs: 1.5, sm: 2 },
                justifyContent: "flex-start",
                gap: 1.2,
                mt: "auto",
                position: "relative",
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.9),
                borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backdropFilter: "blur(4px)"
            }}
        >
            {actions}
        </CardActions>
    );

}

function getRegistrationDisabledReason(
    availability: EventAvailability,
    t: ReturnType<typeof useTranslation>["t"]
) {
    if (availability.hasScheduleConflict) {
        return t("events.detail.scheduleConflict", {
            event: availability.conflictingEventName || t("events.card.otherEvent"),
        });
    }

    if (!availability.hasCapacity) {
        return t("events.detail.noCapacity");
    }

    if (!availability.canRegister) {
        return t("events.card.registrationUnavailable");
    }

    return undefined;
}

function RoleBasedEventActions({ availability, actions, event, loading }: EventCardActionContext) {
    const { user } = useAuth();
    const { t } = useTranslation();
    const role = user?.role.name as RoleConstant | undefined;
    const isOwner = user?.id === event.createdBy;
    const isRegistered = Boolean(
        (availability as EventAvailability & { alreadyRegistered?: boolean }).isAlreadyRegistered ??
        (availability as { alreadyRegistered?: boolean }).alreadyRegistered
    );

    if (role === RoleConstant.ORGANIZER && isOwner) {
        return (
            <Stack direction="row" spacing={1} width="100%">
                <Button size="small" color="primary" variant="contained" onClick={actions.edit} fullWidth>
                    {t("common.actions.edit")}
                </Button>
            </Stack>
        );
    }

    if (role === RoleConstant.ATTENDEE) {
        const registerDisabled = !availability.canRegister || loading.register;
        const registerDisabledReason = !availability.canRegister
            ? getRegistrationDisabledReason(availability, t)
            : undefined;

        return (
            <Stack direction="row" spacing={1} width="100%">
                {isRegistered ? (
                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={actions.cancel}
                        disabled={loading.cancel}
                        fullWidth
                        sx={{ whiteSpace: "nowrap" }}
                    >
                        {t("events.card.cancelRegistration", "Cancelar inscripción")}
                    </Button>
                ) : (
                    <Tooltip title={registerDisabledReason ?? ""} disableHoverListener={!registerDisabledReason}>
                        <Box component="span" sx={{ width: "100%" }}>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={actions.register}
                                disabled={registerDisabled}
                                fullWidth
                            >
                                {t("common.actions.register")}
                            </Button>
                        </Box>
                    </Tooltip>
                )}
            </Stack>
        );
    }

    if (role === RoleConstant.ADMIN) {
        return (
            <Stack direction="row" spacing={1} width="100%">
                <Button size="small" variant="contained" onClick={actions.edit} fullWidth>
                    {t("common.actions.edit")}
                </Button>
            </Stack>
        );
    }

    return null;
}
