import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Stack,
    useTheme,
    Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { CalendarToday, VideoCall, People } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
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

interface EventCardActionContext {
    event: Event;
    availability: EventAvailability;
    actions: EventCardActionHandlers;
}

interface EventCardActionHandlers {
    view: () => void;
    edit: () => void;
    delete: () => void;
    register: () => void;
}

type EventCardActionRenderer = (context: EventCardActionContext) => ReactNode;

interface EventCardProps {
    data: EventWithAvailabilityResponseDto;
    renderActions?: EventCardActionRenderer;
}

const defaultActionRenderer: EventCardActionRenderer = (context) => (
    <RoleBasedEventActions {...context} />
);



export function EventCard({ data, renderActions = defaultActionRenderer }: EventCardProps) {
    const { event, availability } = data;
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const { handlers, dialogs } = useEventActionManager(event);

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
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
                        transform: "translateY(-3px)",
                    },
                    bgcolor: theme.palette.background.paper,
                    width: 330,
                    minHeight: 440,
                    height: "100%",
                }}
            >
                <EventCardImage event={event} />

                <CardContent
                    sx={{
                        p: 2.4,
                        pb: 1.6,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        flexGrow: 1,
                    }}
                >
                    <EventCardHeader event={event} />
                    <EventCardDescription description={event.description} />
                    <EventCardMetaInfo event={event} availability={availability} />
                </CardContent>

                <EventCardFooter actions={renderActions({ event, availability, actions: handlers })} />
            </Card>
            {dialogs}
        </>
    );
}

function useEventActionManager(event: Event) {
    const updateModal = useModalState<Event>();

    const handleEdit = useCallback(() => {
        updateModal.openModal(event);
    }, [event, updateModal]);

    const handlers: EventCardActionHandlers = {
        view: () => console.log("View", event.id),
        edit: handleEdit,
        delete: () => console.log("Delete", event.id),
        register: () => console.log("Register", event.id),
    };

    const dialogs = (
        <UpdateEventFormModal
            open={updateModal.isOpen}
            event={updateModal.data ?? null}
            onClose={updateModal.closeModal}
        />
    );

    return { handlers, dialogs };
}

function EventCardImage({ event }: { event: Event }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const imageUrl = getEventImageUrl(event.imagePath);

    return (
        <Box sx={{ position: "relative", height: 160 }}>
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

function EventCardHeader({ event }: { event: Event }) {

    return (
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
            <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                }}
            >
                {event.name}
            </Typography>
        </Box>
    );
}

function EventCardDescription({ description }: { description?: string }) {
    const trimmed = description?.trim() ?? "";
    if (!trimmed) return null;

    return (
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                fontSize: "0.84rem",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
            }}
        >
            {trimmed}
        </Typography>
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
            <Typography sx={{ color: "primary.main", fontSize: "0.95rem" }}>
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
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
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
                px: 2.2,
                pb: 2,
                pt: 0.5,
                justifyContent: "flex-end",
                gap: 1,
                mt: "auto",
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            {actions}
        </CardActions>
    );

}

function RoleBasedEventActions({ availability, actions }: EventCardActionContext) {
    const { user } = useAuth();
    const { t } = useTranslation();

    const actionByRole: Record<string, ReactNode> = {
        [RoleConstant.ORGANIZER]: (
            <>
                <Button size="small" color="primary" onClick={actions.edit}>
                    {t("common.actions.edit")}
                </Button>
                <Button size="small" color="error" onClick={actions.delete}>
                    {t("common.actions.delete")}
                </Button>
            </>
        ),
        [RoleConstant.ATTENDEE]: availability.canRegister ? (
            <Button
                size="small"
                variant="contained"
                color="success"
                onClick={actions.register}
            >
                {t("common.actions.register")}
            </Button>
        ) : (
            <Button size="small" variant="outlined" onClick={actions.view}>
                {t("common.actions.viewDetails")}
            </Button>
        ),
        [RoleConstant.ADMIN]: (
            <Button size="small" variant="outlined" onClick={actions.view}>
                {t("common.actions.view")}
            </Button>
        ),
    };

    return (
        actionByRole[user?.role.name ?? ""] ?? (
            <Button size="small" variant="outlined" onClick={actions.view}>
                {t("common.actions.view")}
            </Button>
        )
    );
}
