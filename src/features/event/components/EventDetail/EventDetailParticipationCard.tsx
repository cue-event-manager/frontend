import { Alert, Button, Stack, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import { SectionCard } from "./SectionCard";

interface EventDetailParticipationCardProps {
    availability: EventWithAvailabilityResponseDto["availability"];
    isAttendee: boolean;
    canManage: boolean;
    isOwner: boolean;
    onManage: () => void;
    onLogin: () => void;
    onRegister?: () => void;
    onCancel?: () => void;
    isRegistering?: boolean;
    isCancelling?: boolean;
}

export function EventDetailParticipationCard({
    availability,
    isAttendee,
    canManage,
    isOwner,
    onManage,
    onLogin,
    onRegister,
    onCancel,
    isRegistering = false,
    isCancelling = false,
}: EventDetailParticipationCardProps) {
    const { t } = useTranslation();

    const capacityAlert = !availability.hasCapacity;
    const alreadyRegisteredAlert = availability.isAlreadyRegistered;
    const conflictAlert = availability.hasScheduleConflict;
    const availableSpots = availability.availableSpots ?? 0;
    const totalCapacity = availability.totalCapacity ?? availableSpots;

    return (
        <SectionCard>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t("events.detail.participation")}
            </Typography>
            <Stack spacing={2}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <PeopleIcon color="primary" />
                    <Typography fontWeight={600}>
                        {availableSpots} / {totalCapacity} {t("events.detail.spots")}
                    </Typography>
                </Stack>

                {canManage ? (
                    <Button variant="contained" fullWidth onClick={onManage}>
                        {isOwner ? t("events.detail.manageOwn") : t("events.detail.manageEvent")}
                    </Button>
                ) : isAttendee ? (
                    availability.isAlreadyRegistered ? (
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={onCancel}
                            disabled={isCancelling}
                        >
                            {t("events.detail.cancelRegistration")}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!availability.canRegister || isRegistering}
                            fullWidth
                            onClick={onRegister}
                        >
                            {t("common.actions.register")}
                        </Button>
                    )
                ) : (
                    <Button variant="outlined" fullWidth onClick={onLogin}>
                        {t("events.detail.loginToRegister")}
                    </Button>
                )}

                {alreadyRegisteredAlert && (
                    <Alert severity="success" icon={<CheckCircleIcon fontSize="small" />}>
                        {t("events.detail.alreadyRegistered")}
                    </Alert>
                )}

                {capacityAlert && (
                    <Alert severity="warning" icon={<WarningAmberIcon fontSize="small" />}>
                        {t("events.detail.noCapacity")}
                    </Alert>
                )}

                {conflictAlert && (
                    <Alert severity="info" icon={<InfoOutlinedIcon fontSize="small" />}>
                        {t("events.detail.scheduleConflict", {
                            event: availability.conflictingEventName || t("events.card.otherEvent"),
                        })}
                    </Alert>
                )}
            </Stack>
        </SectionCard>
    );
}
