import { useState } from "react";
import { Button, Box, Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEventAvailability } from "../hooks/useEventAvailability";
import { useRegisterToEvent } from "../hooks/useRegisterToEvent";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { useSnackbar } from "notistack";

interface EventRegistrationButtonProps {
    eventId: number;
    eventName: string;
}

export default function EventRegistrationButton({
    eventId,
    eventName,
}: EventRegistrationButtonProps) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const { data: availability, isLoading } = useEventAvailability(eventId);
    const registerMutation = useRegisterToEvent();

    const handleRegisterClick = () => {
        setOpenConfirmDialog(true);
    };

    const handleConfirmRegistration = () => {
        registerMutation.mutate(
            { eventId },
            {
                onSuccess: () => {
                    enqueueSnackbar(
                        t("eventRegistration.messages.registrationSuccess"),
                        { variant: "success" }
                    );
                    setOpenConfirmDialog(false);
                },
                onError: () => {
                    enqueueSnackbar(
                        t("eventRegistration.messages.registrationError"),
                        { variant: "error" }
                    );
                    setOpenConfirmDialog(false);
                },
            }
        );
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" py={2}>
                <CircularProgress />
            </Box>
        );
    }

    if (!availability) {
        return null;
    }

    // Already registered
    if (availability.isAlreadyRegistered) {
        return (
            <Button
                variant="outlined"
                color="success"
                fullWidth
                disabled
                sx={{ py: 1.5, borderRadius: 2 }}
            >
                {t("eventRegistration.alreadyRegistered")}
            </Button>
        );
    }

    // Show alerts for unavailability reasons
    if (!availability.canRegister) {
        return (
            <Box>
                {!availability.hasCapacity && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        <AlertTitle>{t("eventRegistration.alerts.noCapacityTitle")}</AlertTitle>
                        {t("eventRegistration.alerts.noCapacityMessage")}
                    </Alert>
                )}

                {availability.hasScheduleConflict && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>{t("eventRegistration.alerts.scheduleConflictTitle")}</AlertTitle>
                        {t("eventRegistration.alerts.scheduleConflictMessage", {
                            eventName: availability.conflictingEventName,
                        })}
                    </Alert>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    disabled
                    sx={{ py: 1.5, borderRadius: 2 }}
                >
                    {t("eventRegistration.registerButton")}
                </Button>
            </Box>
        );
    }

    // Can register
    return (
        <Box>
            <Alert severity="info" sx={{ mb: 2 }}>
                {t("eventRegistration.availableSpots", {
                    available: availability.availableSpots,
                    total: availability.totalCapacity,
                })}
            </Alert>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegisterClick}
                sx={{ py: 1.5, borderRadius: 2 }}
            >
                {t("eventRegistration.registerButton")}
            </Button>

            <ConfirmDialog
                open={openConfirmDialog}
                title={t("eventRegistration.confirmDialog.title")}
                message={t("eventRegistration.confirmDialog.message", { eventName })}
                confirmText={t("eventRegistration.confirmDialog.confirm")}
                cancelText={t("common.actions.cancel")}
                onConfirm={handleConfirmRegistration}
                onCancel={() => setOpenConfirmDialog(false)}
                isLoading={registerMutation.isPending}
                severity="info"
            />
        </Box>
    );
}
