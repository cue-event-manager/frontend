import { useState } from "react";
import { Button, Tooltip, Alert, Box } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { useCancelEventRegistration } from "../hooks/useCancelEventRegistration";

interface CancelRegistrationButtonProps {
    registrationId: number;
    eventStartDateTime: string;
    onSuccess?: () => void;
}

export function CancelRegistrationButton({
    registrationId,
    eventStartDateTime,
    onSuccess,
}: CancelRegistrationButtonProps) {
    const { t } = useTranslation();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const cancelMutation = useCancelEventRegistration();

    const isCancelable = () => {
        const eventStart = new Date(eventStartDateTime);
        const now = new Date();
        const oneMinuteBefore = new Date(eventStart.getTime() - 60000);
        return now < oneMinuteBefore;
    };

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    };

    const handleConfirm = () => {
        cancelMutation.mutate(registrationId, {
            onSuccess: () => {
                handleCloseConfirm();
                onSuccess?.();
            },
        });
    };

    const canCancel = isCancelable();

    return (
        <>
            <Tooltip
                title={
                    !canCancel
                        ? t("eventRegistration.cannotCancel")
                        : ""
                }
            >
                <span>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelOutlined />}
                        onClick={handleOpenConfirm}
                        disabled={!canCancel || cancelMutation.isPending}
                    >
                        {t("eventRegistration.cancelButton")}
                    </Button>
                </span>
            </Tooltip>

            <ConfirmDialog
                open={confirmOpen}
                title={t("eventRegistration.cancelConfirm.title")}
                message={t("eventRegistration.cancelConfirm.message")}
                confirmText={t("eventRegistration.cancelConfirm.confirm")}
                cancelText={t("common.actions.cancel")}
                onConfirm={handleConfirm}
                onCancel={handleCloseConfirm}
                isLoading={cancelMutation.isPending}
                severity="warning"
            />

            {confirmOpen && (
                <Box sx={{ mt: 2 }}>
                    <Alert severity="info">
                        {t("eventRegistration.cancelConfirm.reregisterInfo")}
                    </Alert>
                </Box>
            )}
        </>
    );
}
